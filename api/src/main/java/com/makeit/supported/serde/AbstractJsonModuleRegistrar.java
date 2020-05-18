package com.makeit.supported.serde;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.DeserializationConfig;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier;
import com.fasterxml.jackson.databind.deser.ResolvableDeserializer;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import lombok.*;
import ma.glasnost.orika.BoundMapperFacade;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import ma.glasnost.orika.impl.generator.JavassistCompilerStrategy;
import ma.glasnost.orika.unenhance.HibernateUnenhanceStrategy;
import org.springframework.beans.factory.InitializingBean;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.io.IOException;

/**
 * The abstract class to register {@link SimpleModule Jackson simple module} to current object mapper unobtrusively.
 * Provides ability to decouple serialization and deserialization logic from business logic of application.
 * <p>
 * Used to create data binding between entity and its dto within json conversation operations.
 * </p>
 *
 * @param <E> the type parameter of entity
 * @param <D> the type parameter of dto
 * @author mxmind
 * @version 1.0.0
 * @since 1.0.0
 */
public abstract class AbstractJsonModuleRegistrar<E, D> implements InitializingBean {

    /**
     * Holds reference on orika bean mapper factory.
     */
    @Getter
    private final DefaultMapperFactory factory;

    /**
     * The entity type.
     */
    protected Class<E> entityType;

    /**
     * The DTO type.
     */
    protected Class<D> dtoType;

    /**
     * Injectable resource that contains reference on default object mapper configured via Spring Framework.
     */
    @Setter
    @Getter
    @Resource(name = "jacksonObjectMapper")
    private ObjectMapper objectMapper;

    /**
     * Instantiates a new Abstract json module registrar.
     */
    protected AbstractJsonModuleRegistrar() {
        factory = new DefaultMapperFactory.Builder()
            .unenhanceStrategy(new HibernateUnenhanceStrategy())
            .compilerStrategy(new JavassistCompilerStrategy())
            .mapNulls(false)
            .build();
    }

    /**
     * Setups factory to declare specific data bindings between entity and dto.
     * Also, this method is eligible to declare data bindings for supported classes.
     */
    @PostConstruct
    public abstract void setupFactory();

    /**
     * Registers the module to object mapper modules registry after configuring all parts of given module.
     */
    @Override
    public void afterPropertiesSet() {
        SimpleModule module = new SimpleModule(this.getClass().getSimpleName());
        module.addSerializer(entityType, new EntitySerializer());
        module.setDeserializerModifier(createModifier());

        objectMapper.registerModule(module);
    }

    /**
     * Setup custom deserializer as object mapper modifier.
     * That allows to have full control on deserialization process.
     *
     * @return the modifier
     */
    private BeanDeserializerModifier createModifier() {
        return new BeanDeserializerModifier() {

            /**
             * {@inheritDoc}
             */
            @Override
            @SuppressWarnings("unchecked")
            public JsonDeserializer<?> modifyDeserializer(DeserializationConfig config,
                                                          BeanDescription beanDesc,
                                                          JsonDeserializer<?> delegatee) {
                // if object is not dto or entity the delegatee will be used as primary deserializer;
                return beanDesc.getBeanClass().equals(entityType)
                    ? new EntityDeserializer((JsonDeserializer<E>) delegatee)
                    : delegatee;
            }
        };
    }

    /**
     * Provides the entity facade to bind entity to dto.
     *
     * @return the entity facade
     */
    protected BoundMapperFacade<E, D> entityFacade() {
        return factory.getMapperFacade(entityType, dtoType);
    }

    /**
     * Provides the dto facade to bind dto to entity.
     *
     * @return the dto facade
     */
    protected BoundMapperFacade<D, E> dtoFacade() {
        return factory.getMapperFacade(dtoType, entityType);
    }

    /**
     * Performs serialization of entity to JSON.
     *
     * @param value    the entity to be serialized
     * @param jgen     the JSON generator
     * @param provider the provider
     * @throws IOException the exception raised, while value cannot be written to JSON
     */
    protected abstract void toData(E value, JsonGenerator jgen, SerializerProvider provider) throws IOException;

    /**
     * Performs deserialization entity from JSON.
     *
     * @param parser    the JSON parser
     * @param ctx       the current deserialization context
     * @param delegatee the fallback deserializer to delegate custom deserialization, in case, if received object is dto
     * @return the entity
     * @throws IOException the exception raised, while JSON cannot be read.
     */
    protected abstract E fromData(JsonParser parser, DeserializationContext ctx, JsonDeserializer<E> delegatee)
        throws IOException;

    /**
     * The proxy entity serializer.
     * Calls #doSerialize method of root class to perform serialization.
     */
    private class EntitySerializer extends JsonSerializer<E> {

        /**
         * {@inheritDoc}
         */
        @Override
        public void serialize(E value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
            toData(value, jgen, provider);
        }
    }

    /**
     * The proxy entity deserializer.
     * Calls #doDeserialize method of root class to perform deserialization.
     */
    private class EntityDeserializer extends StdDeserializer<E> implements ResolvableDeserializer {

        private static final long serialVersionUID = -6100403380267991026L;
        /**
         * The fallback deserializer to perform custom deserialization, in case, if received object is dto.
         */
        protected final JsonDeserializer<E> delegatee;

        /**
         * Instantiates a new Entity deserializer.
         *
         * @param delegatee the delegatee
         */
        public EntityDeserializer(JsonDeserializer<E> delegatee) {
            super(entityType);
            this.delegatee = delegatee;
        }

        /**
         * {@inheritDoc}
         */
        @Override
        public E deserialize(JsonParser parser, DeserializationContext ctx) throws IOException {
            return fromData(parser, ctx, delegatee);
        }

        /**
         * {@inheritDoc}
         */
        @Override
        public void resolve(DeserializationContext ctx) throws JsonMappingException {
            ((ResolvableDeserializer) delegatee).resolve(ctx);
        }
    }
}

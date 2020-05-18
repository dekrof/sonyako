package com.makeit.supported.serde;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public abstract class SimpleJsonModuleRegistrar<E, D> extends AbstractJsonModuleRegistrar<E, D> {

    protected SimpleJsonModuleRegistrar(Class<E> entityType, Class<D> dtoType) {
        this.entityType = entityType;
        this.dtoType = dtoType;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void setupFactory() {
        getFactory().classMap(entityType, dtoType)
            .byDefault()
            .register();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void toData(E value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        jgen.writeObject(entityFacade().map(value));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected E fromData(JsonParser parser, DeserializationContext ctx, JsonDeserializer<E> delegatee) throws IOException {
        try {
            return delegatee.deserialize(parser, ctx);
        } catch (Exception ex) {
            return dtoFacade().map(parser.readValueAs(dtoType));
        }
    }
}

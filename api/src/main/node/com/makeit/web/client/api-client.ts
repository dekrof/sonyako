// @ts-nocheck

export interface HttpClient<O> {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; options?: O; }): RestResponse<R>;
}

export class AuthenticationClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/auth/check-email
     * Java method: com.makeit.api.controller.AuthenticationController.checkEmailInUse
     */
    checkEmailInUse(queryParams: { email: string; }, options?: O): RestResponse<ApiResponse<boolean>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/auth/check-email`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/auth/check-username
     * Java method: com.makeit.api.controller.AuthenticationController.checkUsernameInUse
     */
    checkUsernameInUse(queryParams: { username: string; }, options?: O): RestResponse<ApiResponse<boolean>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/auth/check-username`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP POST /api/auth/login
     * Java method: com.makeit.api.controller.AuthenticationController.authenticateUser
     */
    authenticateUser(request: LoginDto, options?: O): RestResponse<JwtAuthenticationDto> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/login`, data: request, options: options });
    }

    /**
     * HTTP POST /api/auth/password/reset
     * Java method: com.makeit.api.controller.AuthenticationController.resetPassword
     */
    resetPassword(request: PasswordResetDto, options?: O): RestResponse<ApiResponse<string>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/password/reset`, data: request, options: options });
    }

    /**
     * HTTP POST /api/auth/password/reset-link
     * Java method: com.makeit.api.controller.AuthenticationController.resetLink
     */
    resetLink(request: PasswordResetLinkDto, options?: O): RestResponse<ApiResponse<string>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/password/reset-link`, data: request, options: options });
    }

    /**
     * HTTP POST /api/auth/refresh
     * Java method: com.makeit.api.controller.AuthenticationController.refreshJwtToken
     */
    refreshJwtToken(request: TokenRefreshDto, options?: O): RestResponse<JwtAuthenticationDto> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/refresh`, data: request, options: options });
    }

    /**
     * HTTP POST /api/auth/register
     * Java method: com.makeit.api.controller.AuthenticationController.registerUser
     */
    registerUser(request: RegistrationDto, options?: O): RestResponse<ApiResponse<string>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/register`, data: request, options: options });
    }

    /**
     * HTTP GET /api/auth/registration-confirmation
     * Java method: com.makeit.api.controller.AuthenticationController.confirmRegistration
     */
    confirmRegistration(queryParams: { token: string; }, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/auth/registration-confirmation`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/auth/resend-registration-token
     * Java method: com.makeit.api.controller.AuthenticationController.resendRegistrationToken
     */
    resendRegistrationToken(queryParams: { token: string; }, options?: O): RestResponse<ApiResponse<string>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/auth/resend-registration-token`, queryParams: queryParams, options: options });
    }
}

export class FreelancerClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/freelancer/get/top/nine/freelancers
     * Java method: com.makeit.api.controller.FreelancerController.getTopNineFreelancers
     */
    getTopNineFreelancers(options?: O): RestResponse<TopDeveloperDto[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/freelancer/get/top/nine/freelancers`, options: options });
    }
}

export class UserClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/user/admins
     * Java method: com.makeit.api.controller.UserController.getAllAdmins
     */
    getAllAdmins(options?: O): RestResponse<User[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/user/admins`, options: options });
    }

    /**
     * HTTP POST /api/user/logout
     * Java method: com.makeit.api.controller.UserController.logoutUser
     */
    logoutUser(request: LogoutDto, options?: O): RestResponse<ApiResponse<string>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/user/logout`, data: request, options: options });
    }

    /**
     * HTTP POST /api/user/password/update
     * Java method: com.makeit.api.controller.UserController.updateUserPassword
     */
    updateUserPassword(request: UpdatePasswordDto, options?: O): RestResponse<ApiResponse<string>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/user/password/update`, data: request, options: options });
    }

    /**
     * HTTP GET /api/user/profile
     * Java method: com.makeit.api.controller.UserController.getUserProfile
     */
    getUserProfile(options?: O): RestResponse<User> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/user/profile`, options: options });
    }
}

export class Address {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    countryCode: string;
    region: string;
    district: string;
    city: string;
    cityType: CityType;
    street: string;
    streetType: StreetType;
    houseNumber: string;
    postalCode: string;

    static fromData(data: Address, target?: Address): Address {
        if (!data) {
            return data;
        }
        const instance = target || new Address();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.countryCode = data.countryCode;
        instance.region = data.region;
        instance.district = data.district;
        instance.city = data.city;
        instance.cityType = data.cityType;
        instance.street = data.street;
        instance.streetType = data.streetType;
        instance.houseNumber = data.houseNumber;
        instance.postalCode = data.postalCode;
        return instance;
    }
}

export class AddressDto {
    id: number;
    countryCode: string;
    region: string;
    district: string;
    city: string;
    cityType: CityType;
    street: string;
    streetType: StreetType;
    houseNumber: string;
    postalCode: string;

    static fromData(data: AddressDto, target?: AddressDto): AddressDto {
        if (!data) {
            return data;
        }
        const instance = target || new AddressDto();
        instance.id = data.id;
        instance.countryCode = data.countryCode;
        instance.region = data.region;
        instance.district = data.district;
        instance.city = data.city;
        instance.cityType = data.cityType;
        instance.street = data.street;
        instance.streetType = data.streetType;
        instance.houseNumber = data.houseNumber;
        instance.postalCode = data.postalCode;
        return instance;
    }
}

export class ApiResponse<T> {
    data: T;
    success: boolean;
    timestamp: Date;
    cause: string;
    path: string;

    static fromDataFn<T>(constructorFnOfT: (data: T) => T): (data: ApiResponse<T>) => ApiResponse<T> {
        return data => ApiResponse.fromData(data, constructorFnOfT);
    }

    static fromData<T>(data: ApiResponse<T>, constructorFnOfT: (data: T) => T, target?: ApiResponse<T>): ApiResponse<T> {
        if (!data) {
            return data;
        }
        const instance = target || new ApiResponse<T>();
        instance.data = constructorFnOfT(data.data);
        instance.success = data.success;
        instance.timestamp = data.timestamp;
        instance.cause = data.cause;
        instance.path = data.path;
        return instance;
    }
}

export class BaseProfileDto {
    id: number;
    email: string;
    name: string;
    patronymicName: string;
    surname: string;
    avatarUrl: string;

    static fromData(data: BaseProfileDto, target?: BaseProfileDto): BaseProfileDto {
        if (!data) {
            return data;
        }
        const instance = target || new BaseProfileDto();
        instance.id = data.id;
        instance.email = data.email;
        instance.name = data.name;
        instance.patronymicName = data.patronymicName;
        instance.surname = data.surname;
        instance.avatarUrl = data.avatarUrl;
        return instance;
    }
}

export class Category {
    id: number;
    name: string;
    description: string;
    projects: Project[];

    static fromData(data: Category, target?: Category): Category {
        if (!data) {
            return data;
        }
        const instance = target || new Category();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.projects = __getCopyArrayFn(Project.fromData)(data.projects);
        return instance;
    }
}

export class Comment {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    commentator: User;
    title: string;
    description: string;
    parent: Comment;
    children: Comment[];

    static fromData(data: Comment, target?: Comment): Comment {
        if (!data) {
            return data;
        }
        const instance = target || new Comment();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.commentator = User.fromData(data.commentator);
        instance.title = data.title;
        instance.description = data.description;
        instance.parent = Comment.fromData(data.parent);
        instance.children = __getCopyArrayFn(Comment.fromData)(data.children);
        return instance;
    }
}

export class Company {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    name: string;
    description: string;
    logo: string;
    owner: User;
    projects: Project[];

    static fromData(data: Company, target?: Company): Company {
        if (!data) {
            return data;
        }
        const instance = target || new Company();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.logo = data.logo;
        instance.owner = User.fromData(data.owner);
        instance.projects = __getCopyArrayFn(Project.fromData)(data.projects);
        return instance;
    }
}

export class DeviceInfoDto {
    deviceId: string;
    deviceType: DeviceType;
    notificationToken: string;

    static fromData(data: DeviceInfoDto, target?: DeviceInfoDto): DeviceInfoDto {
        if (!data) {
            return data;
        }
        const instance = target || new DeviceInfoDto();
        instance.deviceId = data.deviceId;
        instance.deviceType = data.deviceType;
        instance.notificationToken = data.notificationToken;
        return instance;
    }
}

export class EmailVerificationToken {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    token: string;
    tokenStatus: TokenStatusType;
    user: User;
    expiryDate: Date;

    static fromData(data: EmailVerificationToken, target?: EmailVerificationToken): EmailVerificationToken {
        if (!data) {
            return data;
        }
        const instance = target || new EmailVerificationToken();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.token = data.token;
        instance.tokenStatus = data.tokenStatus;
        instance.user = User.fromData(data.user);
        instance.expiryDate = data.expiryDate;
        return instance;
    }
}

export class ProfileDto extends BaseProfileDto {
    phoneNumber: string;
    birthday: Date;

    static fromData(data: ProfileDto, target?: ProfileDto): ProfileDto {
        if (!data) {
            return data;
        }
        const instance = target || new ProfileDto();
        super.fromData(data, instance);
        instance.phoneNumber = data.phoneNumber;
        instance.birthday = data.birthday;
        return instance;
    }
}

export class FullProfileDto extends ProfileDto {
    address: AddressDto;

    static fromData(data: FullProfileDto, target?: FullProfileDto): FullProfileDto {
        if (!data) {
            return data;
        }
        const instance = target || new FullProfileDto();
        super.fromData(data, instance);
        instance.address = AddressDto.fromData(data.address);
        return instance;
    }
}

export interface GrantedAuthority {
    authority: string;
}

export class JwtAuthenticationDto {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiryDuration: number;

    static fromData(data: JwtAuthenticationDto, target?: JwtAuthenticationDto): JwtAuthenticationDto {
        if (!data) {
            return data;
        }
        const instance = target || new JwtAuthenticationDto();
        instance.accessToken = data.accessToken;
        instance.refreshToken = data.refreshToken;
        instance.tokenType = data.tokenType;
        instance.expiryDuration = data.expiryDuration;
        return instance;
    }
}

export class JwtAuthenticationToken {
    authorities: GrantedAuthority[];
    details: any;
    authenticated: boolean;
    principal: any;
    credentials: any;
    token: string;
    name: string;

    static fromData(data: JwtAuthenticationToken, target?: JwtAuthenticationToken): JwtAuthenticationToken {
        if (!data) {
            return data;
        }
        const instance = target || new JwtAuthenticationToken();
        super.fromData(data, instance);
        instance.authorities = __getCopyArrayFn(__identity<GrantedAuthority>())(data.authorities);
        instance.details = data.details;
        instance.authenticated = data.authenticated;
        instance.principal = data.principal;
        instance.credentials = data.credentials;
        instance.token = data.token;
        instance.name = data.name;
        return instance;
    }
}

export class LoginDto {
    username: string;
    email: string;
    password: string;
    deviceInfo: DeviceInfoDto;

    static fromData(data: LoginDto, target?: LoginDto): LoginDto {
        if (!data) {
            return data;
        }
        const instance = target || new LoginDto();
        instance.username = data.username;
        instance.email = data.email;
        instance.password = data.password;
        instance.deviceInfo = DeviceInfoDto.fromData(data.deviceInfo);
        return instance;
    }
}

/**
 * The logout request payload
 */
export class LogoutDto {
    deviceInfo: DeviceInfoDto;

    static fromData(data: LogoutDto, target?: LogoutDto): LogoutDto {
        if (!data) {
            return data;
        }
        const instance = target || new LogoutDto();
        instance.deviceInfo = DeviceInfoDto.fromData(data.deviceInfo);
        return instance;
    }
}

/**
 * The password reset request payload
 */
export class PasswordResetDto {
    password: string;
    confirmPassword: string;
    token: string;

    static fromData(data: PasswordResetDto, target?: PasswordResetDto): PasswordResetDto {
        if (!data) {
            return data;
        }
        const instance = target || new PasswordResetDto();
        instance.password = data.password;
        instance.confirmPassword = data.confirmPassword;
        instance.token = data.token;
        return instance;
    }
}

export class PasswordResetLinkDto {
    email: string;

    static fromData(data: PasswordResetLinkDto, target?: PasswordResetLinkDto): PasswordResetLinkDto {
        if (!data) {
            return data;
        }
        const instance = target || new PasswordResetLinkDto();
        instance.email = data.email;
        return instance;
    }
}

export class PasswordResetToken {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    token: string;
    user: User;
    expiryDate: Date;

    static fromData(data: PasswordResetToken, target?: PasswordResetToken): PasswordResetToken {
        if (!data) {
            return data;
        }
        const instance = target || new PasswordResetToken();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.token = data.token;
        instance.user = User.fromData(data.user);
        instance.expiryDate = data.expiryDate;
        return instance;
    }
}

export class Profile {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    patronymicName: string;
    surname: string;
    birthday: Date;
    avatarUrl: string;
    address: Address;

    static fromData(data: Profile, target?: Profile): Profile {
        if (!data) {
            return data;
        }
        const instance = target || new Profile();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.email = data.email;
        instance.phoneNumber = data.phoneNumber;
        instance.name = data.name;
        instance.patronymicName = data.patronymicName;
        instance.surname = data.surname;
        instance.birthday = data.birthday;
        instance.avatarUrl = data.avatarUrl;
        instance.address = Address.fromData(data.address);
        return instance;
    }
}

export class Project {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    name: string;
    description: string;
    company: Company;
    category: Category;
    fixedRate: boolean;
    fixedTime: boolean;
    ratePerHour: number;
    rateCurrency: string;
    minDuration: number;
    maxDuration: number;
    tags: Tag[];

    static fromData(data: Project, target?: Project): Project {
        if (!data) {
            return data;
        }
        const instance = target || new Project();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.company = Company.fromData(data.company);
        instance.category = Category.fromData(data.category);
        instance.fixedRate = data.fixedRate;
        instance.fixedTime = data.fixedTime;
        instance.ratePerHour = data.ratePerHour;
        instance.rateCurrency = data.rateCurrency;
        instance.minDuration = data.minDuration;
        instance.maxDuration = data.maxDuration;
        instance.tags = __getCopyArrayFn(Tag.fromData)(data.tags);
        return instance;
    }
}

export class ProjectComment {
    id: ProjectCommentId;
    project: Project;
    comment: Comment;

    static fromData(data: ProjectComment, target?: ProjectComment): ProjectComment {
        if (!data) {
            return data;
        }
        const instance = target || new ProjectComment();
        instance.id = ProjectCommentId.fromData(data.id);
        instance.project = Project.fromData(data.project);
        instance.comment = Comment.fromData(data.comment);
        return instance;
    }
}

export class ProjectCommentId {
    projectId: number;
    commentId: number;

    static fromData(data: ProjectCommentId, target?: ProjectCommentId): ProjectCommentId {
        if (!data) {
            return data;
        }
        const instance = target || new ProjectCommentId();
        instance.projectId = data.projectId;
        instance.commentId = data.commentId;
        return instance;
    }
}

export class RefreshToken {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    token: string;
    userDevice: UserDevice;
    refreshCount: number;
    expiryDate: Date;

    static fromData(data: RefreshToken, target?: RefreshToken): RefreshToken {
        if (!data) {
            return data;
        }
        const instance = target || new RefreshToken();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.token = data.token;
        instance.userDevice = UserDevice.fromData(data.userDevice);
        instance.refreshCount = data.refreshCount;
        instance.expiryDate = data.expiryDate;
        return instance;
    }
}

/**
 * The registration request payload
 */
export class RegistrationDto {
    username: string;
    email: string;
    password: string;
    profile: Profile;
    registerAsAdmin: boolean;
    registerAsFreelancer: boolean;
    registerAsOwner: boolean;

    static fromData(data: RegistrationDto, target?: RegistrationDto): RegistrationDto {
        if (!data) {
            return data;
        }
        const instance = target || new RegistrationDto();
        instance.username = data.username;
        instance.email = data.email;
        instance.password = data.password;
        instance.profile = Profile.fromData(data.profile);
        instance.registerAsAdmin = data.registerAsAdmin;
        instance.registerAsFreelancer = data.registerAsFreelancer;
        instance.registerAsOwner = data.registerAsOwner;
        return instance;
    }
}

export class Role {
    id: number;
    roleName: RoleName;
    users: User[];

    static fromData(data: Role, target?: Role): Role {
        if (!data) {
            return data;
        }
        const instance = target || new Role();
        instance.id = data.id;
        instance.roleName = data.roleName;
        instance.users = __getCopyArrayFn(User.fromData)(data.users);
        return instance;
    }
}

export class Skill {
    id: number;
    name: string;
    description: string;
    ratings: SkillRating[];

    static fromData(data: Skill, target?: Skill): Skill {
        if (!data) {
            return data;
        }
        const instance = target || new Skill();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.ratings = __getCopyArrayFn(SkillRating.fromData)(data.ratings);
        return instance;
    }
}

export class SkillRating {
    id: SkillRatingId;
    user: User;
    skill: Skill;
    rating: number;

    static fromData(data: SkillRating, target?: SkillRating): SkillRating {
        if (!data) {
            return data;
        }
        const instance = target || new SkillRating();
        instance.id = SkillRatingId.fromData(data.id);
        instance.user = User.fromData(data.user);
        instance.skill = Skill.fromData(data.skill);
        instance.rating = data.rating;
        return instance;
    }
}

export class SkillRatingId {
    userId: number;
    skillId: number;

    static fromData(data: SkillRatingId, target?: SkillRatingId): SkillRatingId {
        if (!data) {
            return data;
        }
        const instance = target || new SkillRatingId();
        instance.userId = data.userId;
        instance.skillId = data.skillId;
        return instance;
    }
}

export class Tag {
    id: number;
    name: string;
    description: string;
    users: User[];
    projects: Project[];
    tasks: Task[];

    static fromData(data: Tag, target?: Tag): Tag {
        if (!data) {
            return data;
        }
        const instance = target || new Tag();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.users = __getCopyArrayFn(User.fromData)(data.users);
        instance.projects = __getCopyArrayFn(Project.fromData)(data.projects);
        instance.tasks = __getCopyArrayFn(Task.fromData)(data.tasks);
        return instance;
    }
}

export class TagDto {
    id: number;
    name: string;
    description: string;

    static fromData(data: TagDto, target?: TagDto): TagDto {
        if (!data) {
            return data;
        }
        const instance = target || new TagDto();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        return instance;
    }
}

export class Task {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    name: string;
    description: string;
    complexity: number;
    duration: number;
    projectId: number;
    parentTaskId: number;
    progressStatus: number;
    statedAt: Date;
    users: User[];
    tags: Tag[];
    overdone: boolean;

    static fromData(data: Task, target?: Task): Task {
        if (!data) {
            return data;
        }
        const instance = target || new Task();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.complexity = data.complexity;
        instance.duration = data.duration;
        instance.projectId = data.projectId;
        instance.parentTaskId = data.parentTaskId;
        instance.progressStatus = data.progressStatus;
        instance.statedAt = data.statedAt;
        instance.users = __getCopyArrayFn(User.fromData)(data.users);
        instance.tags = __getCopyArrayFn(Tag.fromData)(data.tags);
        instance.overdone = data.overdone;
        return instance;
    }
}

export class TaskComment {
    id: TaskCommentId;
    task: Task;
    comment: Comment;

    static fromData(data: TaskComment, target?: TaskComment): TaskComment {
        if (!data) {
            return data;
        }
        const instance = target || new TaskComment();
        instance.id = TaskCommentId.fromData(data.id);
        instance.task = Task.fromData(data.task);
        instance.comment = Comment.fromData(data.comment);
        return instance;
    }
}

export class TaskCommentId {
    taskId: number;
    commentId: number;

    static fromData(data: TaskCommentId, target?: TaskCommentId): TaskCommentId {
        if (!data) {
            return data;
        }
        const instance = target || new TaskCommentId();
        instance.taskId = data.taskId;
        instance.commentId = data.commentId;
        return instance;
    }
}

export class TokenRefreshDto {
    refreshToken: string;

    static fromData(data: TokenRefreshDto, target?: TokenRefreshDto): TokenRefreshDto {
        if (!data) {
            return data;
        }
        const instance = target || new TokenRefreshDto();
        instance.refreshToken = data.refreshToken;
        return instance;
    }
}

export class TopDeveloperDto {
    id: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    tags: TagDto[];
    address: AddressDto;

    static fromData(data: TopDeveloperDto, target?: TopDeveloperDto): TopDeveloperDto {
        if (!data) {
            return data;
        }
        const instance = target || new TopDeveloperDto();
        instance.id = data.id;
        instance.firstName = data.firstName;
        instance.lastName = data.lastName;
        instance.avatarUrl = data.avatarUrl;
        instance.tags = __getCopyArrayFn(TagDto.fromData)(data.tags);
        instance.address = AddressDto.fromData(data.address);
        return instance;
    }
}

export class UpdatePasswordDto {
    oldPassword: string;
    newPassword: string;

    static fromData(data: UpdatePasswordDto, target?: UpdatePasswordDto): UpdatePasswordDto {
        if (!data) {
            return data;
        }
        const instance = target || new UpdatePasswordDto();
        instance.oldPassword = data.oldPassword;
        instance.newPassword = data.newPassword;
        return instance;
    }
}

export class User {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    username: string;
    password: string;
    profile: Profile;
    active: boolean;
    emailVerified: boolean;
    roles: Role[];
    tags: Tag[];
    tasks: Task[];
    ratedSkills: SkillRating[];
    comments: Comment[];
    companies: Company[];

    static fromData(data: User, target?: User): User {
        if (!data) {
            return data;
        }
        const instance = target || new User();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.username = data.username;
        instance.password = data.password;
        instance.profile = Profile.fromData(data.profile);
        instance.active = data.active;
        instance.emailVerified = data.emailVerified;
        instance.roles = __getCopyArrayFn(Role.fromData)(data.roles);
        instance.tags = __getCopyArrayFn(Tag.fromData)(data.tags);
        instance.tasks = __getCopyArrayFn(Task.fromData)(data.tasks);
        instance.ratedSkills = __getCopyArrayFn(SkillRating.fromData)(data.ratedSkills);
        instance.comments = __getCopyArrayFn(Comment.fromData)(data.comments);
        instance.companies = __getCopyArrayFn(Company.fromData)(data.companies);
        return instance;
    }
}

export class UserComment {
    id: UserCommentId;
    user: User;
    comment: Comment;

    static fromData(data: UserComment, target?: UserComment): UserComment {
        if (!data) {
            return data;
        }
        const instance = target || new UserComment();
        instance.id = UserCommentId.fromData(data.id);
        instance.user = User.fromData(data.user);
        instance.comment = Comment.fromData(data.comment);
        return instance;
    }
}

export class UserCommentId {
    taskId: number;
    commentId: number;

    static fromData(data: UserCommentId, target?: UserCommentId): UserCommentId {
        if (!data) {
            return data;
        }
        const instance = target || new UserCommentId();
        instance.taskId = data.taskId;
        instance.commentId = data.commentId;
        return instance;
    }
}

export class UserDevice {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    user: User;
    deviceType: DeviceType;
    notificationToken: string;
    deviceId: string;
    refreshToken: RefreshToken;
    refreshActive: boolean;

    static fromData(data: UserDevice, target?: UserDevice): UserDevice {
        if (!data) {
            return data;
        }
        const instance = target || new UserDevice();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.user = User.fromData(data.user);
        instance.deviceType = data.deviceType;
        instance.notificationToken = data.notificationToken;
        instance.deviceId = data.deviceId;
        instance.refreshToken = RefreshToken.fromData(data.refreshToken);
        instance.refreshActive = data.refreshActive;
        return instance;
    }
}

export class UserProject {
    id: UserProjectId;
    user: User;
    project: Project;
    rating: number;
    userCreator: boolean;
    userOwner: boolean;

    static fromData(data: UserProject, target?: UserProject): UserProject {
        if (!data) {
            return data;
        }
        const instance = target || new UserProject();
        instance.id = UserProjectId.fromData(data.id);
        instance.user = User.fromData(data.user);
        instance.project = Project.fromData(data.project);
        instance.rating = data.rating;
        instance.userCreator = data.userCreator;
        instance.userOwner = data.userOwner;
        return instance;
    }
}

export class UserProjectId {
    userId: number;
    skillId: number;

    static fromData(data: UserProjectId, target?: UserProjectId): UserProjectId {
        if (!data) {
            return data;
        }
        const instance = target || new UserProjectId();
        instance.userId = data.userId;
        instance.skillId = data.skillId;
        return instance;
    }
}

export type RestResponse<R> = Promise<Axios.GenericAxiosResponse<R>>;

export const enum CityType {
    CITY = "CITY",
    TOWN = "TOWN",
    TOWNSHIP = "TOWNSHIP",
    VILLAGE = "VILLAGE",
}

export const enum DeviceType {
    DEVICE_TYPE_ANDROID = "DEVICE_TYPE_ANDROID",
    DEVICE_TYPE_IOS = "DEVICE_TYPE_IOS",
    DEVICE_TYPE_PC_BOX = "DEVICE_TYPE_PC_BOX",
}

export const enum RoleName {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_OWNER = "ROLE_OWNER",
    ROLE_FREELANCER = "ROLE_FREELANCER",
}

export const enum StreetType {
    STREET = "STREET",
    BOULEVARD = "BOULEVARD",
    AVENUE = "AVENUE",
    ALLEY = "ALLEY",
    LANE = "LANE",
    SQUARE = "SQUARE",
}

export const enum TokenStatusType {
    STATUS_PENDING = "STATUS_PENDING",
    STATUS_CONFIRMED = "STATUS_CONFIRMED",
}

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}

function __getCopyArrayFn<T>(itemCopyFn: (item: T) => T): (array: T[]) => T[] {
    return (array: T[]) => __copyArray(array, itemCopyFn);
}

function __copyArray<T>(array: T[], itemCopyFn: (item: T) => T): T[] {
    return array && array.map(item => item && itemCopyFn(item));
}

function __getCopyObjectFn<T>(itemCopyFn: (item: T) => T): (object: { [index: string]: T }) => { [index: string]: T } {
    return (object: { [index: string]: T }) => __copyObject(object, itemCopyFn);
}

function __copyObject<T>(object: { [index: string]: T }, itemCopyFn: (item: T) => T): { [index: string]: T } {
    if (!object) {
        return object;
    }
    const result: any = {};
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];
            result[key] = value && itemCopyFn(value);
        }
    }
    return result;
}

function __identity<T>(): (value: T) => T {
    return value => value;
}


// Added by 'AxiosClientExtension' extension

import axios from "axios";
import * as Axios from "axios";

declare module "axios" {
    export interface GenericAxiosResponse<R> extends Axios.AxiosResponse {
        data: R;
    }
}

class AxiosHttpClient implements HttpClient<Axios.AxiosRequestConfig> {

    constructor(private axios: Axios.AxiosInstance) {
    }

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; options?: Axios.AxiosRequestConfig; }): RestResponse<R> {
        function assign(target: any, source?: any) {
            if (source != undefined) {
                for (const key in source) {
                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        }

        const config: Axios.AxiosRequestConfig = {};
        config.method = requestConfig.method as typeof config.method;  // `string` in axios 0.16.0, `Method` in axios 0.19.0
        config.url = requestConfig.url;
        config.params = requestConfig.queryParams;
        config.data = requestConfig.data;
        assign(config, requestConfig.options);
        const copyFn = requestConfig.copyFn;

        const axiosResponse = this.axios.request(config);
        return axiosResponse.then(axiosResponse => {
            if (copyFn && axiosResponse.data) {
                (axiosResponse as any).originalData = axiosResponse.data;
                axiosResponse.data = copyFn(axiosResponse.data);
            }
            return axiosResponse;
        });
    }
}

export class AxiosAuthenticationClient extends AuthenticationClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosFreelancerClient extends FreelancerClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosUserClient extends UserClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

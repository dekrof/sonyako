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

export class CategoryClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/category
     * Java method: com.makeit.api.controller.CategoryController.getCategories
     */
    getCategories(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<CategoryDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/category`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP POST /api/category
     * Java method: com.makeit.api.controller.CategoryController.saveCategory
     */
    saveCategory(dto: CategoryDto, options?: O): RestResponse<ApiResponse<CategoryDto>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/category`, data: dto, options: options });
    }

    /**
     * HTTP PUT /api/category
     * Java method: com.makeit.api.controller.CategoryController.updateCategory
     */
    updateCategory(dto: CategoryDto, options?: O): RestResponse<ApiResponse<CategoryDto>> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/category`, data: dto, options: options });
    }

    /**
     * HTTP DELETE /api/category/{id}
     * Java method: com.makeit.api.controller.CategoryController.deleteCategory
     */
    deleteCategory(id: number, options?: O): RestResponse<ApiResponse<CategoryDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/category/${id}`, options: options });
    }

    /**
     * HTTP GET /api/category/{id}
     * Java method: com.makeit.api.controller.CategoryController.getCategory
     */
    getCategory(id: number, options?: O): RestResponse<ApiResponse<CategoryDto>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/category/${id}`, options: options });
    }
}

export class CommentClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/comment
     * Java method: com.makeit.api.controller.CommentController.getComments
     */
    getComments(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<CommentDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/comment`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP POST /api/comment
     * Java method: com.makeit.api.controller.CommentController.saveComment
     */
    saveComment(dto: CommentDto, options?: O): RestResponse<ApiResponse<CommentDto>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/comment`, data: dto, options: options });
    }

    /**
     * HTTP PUT /api/comment
     * Java method: com.makeit.api.controller.CommentController.updateComment
     */
    updateComment(dto: CommentDto, options?: O): RestResponse<ApiResponse<CommentDto>> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/comment`, data: dto, options: options });
    }

    /**
     * HTTP GET /api/comment/of/project/{id}
     * Java method: com.makeit.api.controller.CommentController.getProjectComments
     */
    getProjectComments(id: number, queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<CommentDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/comment/of/project/${id}`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP DELETE /api/comment/of/project/{projectId}/{id}
     * Java method: com.makeit.api.controller.CommentController.deleteComment
     */
    deleteComment(projectId: number, id: number, options?: O): RestResponse<ApiResponse<CommentDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/comment/of/project/${projectId}/${id}`, options: options });
    }

    /**
     * HTTP GET /api/comment/of/user/{id}
     * Java method: com.makeit.api.controller.CommentController.getUserComments
     */
    getUserComments(id: number, queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<CommentDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/comment/of/user/${id}`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP DELETE /api/comment/of/user/{userId}/{id}
     * Java method: com.makeit.api.controller.CommentController.deleteUserComment
     */
    deleteUserComment(userId: number, id: number, options?: O): RestResponse<ApiResponse<CommentDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/comment/of/user/${userId}/${id}`, options: options });
    }

    /**
     * HTTP GET /api/comment/{id}
     * Java method: com.makeit.api.controller.CommentController.getComment
     */
    getComment(id: number, options?: O): RestResponse<ApiResponse<CommentDto>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/comment/${id}`, options: options });
    }
}

export class CompanyClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/company
     * Java method: com.makeit.api.controller.CompanyController.getCompanies
     */
    getCompanies(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<CompanyDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/company`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP POST /api/company
     * Java method: com.makeit.api.controller.CompanyController.saveCompany
     */
    saveCompany(dto: CompanyDto, options?: O): RestResponse<ApiResponse<CompanyDto>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/company`, data: dto, options: options });
    }

    /**
     * HTTP PUT /api/company
     * Java method: com.makeit.api.controller.CompanyController.updateCompany
     */
    updateCompany(dto: CompanyDto, options?: O): RestResponse<ApiResponse<CompanyDto>> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/company`, data: dto, options: options });
    }

    /**
     * HTTP DELETE /api/company/{id}
     * Java method: com.makeit.api.controller.CompanyController.deleteCompany
     */
    deleteCompany(id: number, options?: O): RestResponse<ApiResponse<CompanyDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/company/${id}`, options: options });
    }

    /**
     * HTTP GET /api/company/{id}
     * Java method: com.makeit.api.controller.CompanyController.getCompany
     */
    getCompany(id: number, options?: O): RestResponse<ApiResponse<CompanyDto>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/company/${id}`, options: options });
    }
}

export class FreelancerClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /api/freelancer/accept/freelancer
     * Java method: com.makeit.api.controller.FreelancerController.acceptFreelancer
     */
    acceptFreelancer(userProject: UserProjectDto, options?: O): RestResponse<ApiResponse<boolean>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/freelancer/accept/freelancer`, data: userProject, options: options });
    }

    /**
     * HTTP POST /api/freelancer/decline/freelancer
     * Java method: com.makeit.api.controller.FreelancerController.declineFreelancer
     */
    declineFreelancer(userProject: UserProjectDto, options?: O): RestResponse<ApiResponse<boolean>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/freelancer/decline/freelancer`, data: userProject, options: options });
    }

    /**
     * HTTP GET /api/freelancer/freelancers/page
     * Java method: com.makeit.api.controller.FreelancerController.getFreelancersPage
     */
    getFreelancersPage(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<TopDeveloperDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/freelancer/freelancers/page`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/freelancer/get/top/nine/freelancers
     * Java method: com.makeit.api.controller.FreelancerController.getTopNineFreelancers
     */
    getTopNineFreelancers(options?: O): RestResponse<TopDeveloperDto[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/freelancer/get/top/nine/freelancers`, options: options });
    }

    /**
     * HTTP POST /api/freelancer/hire/freelancer
     * Java method: com.makeit.api.controller.FreelancerController.hireFreelancer
     */
    hireFreelancer(userProject: UserProjectDto, options?: O): RestResponse<ApiResponse<boolean>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/freelancer/hire/freelancer`, data: userProject, options: options });
    }

    /**
     * HTTP GET /api/freelancer/of/category/{categoryId}
     * Java method: com.makeit.api.controller.FreelancerController.getFreelancers
     */
    getFreelancers(categoryId: number, queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<TopDeveloperDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/freelancer/of/category/${categoryId}`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/freelancer/owners/page
     * Java method: com.makeit.api.controller.FreelancerController.getOwnersPage
     */
    getOwnersPage(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<TopDeveloperDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/freelancer/owners/page`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/freelancer/projects/{userId}
     * Java method: com.makeit.api.controller.FreelancerController.getUserProjects
     */
    getUserProjects(userId: number, queryParams?: { status?: UserStatusType; }, options?: O): RestResponse<ApiResponse<ProjectDto[]>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/freelancer/projects/${userId}`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/freelancer/{id}
     * Java method: com.makeit.api.controller.FreelancerController.getFreelancer
     */
    getFreelancer(id: number, options?: O): RestResponse<ApiResponse<User>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/freelancer/${id}`, options: options });
    }
}

export class ProjectClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /api/project
     * Java method: com.makeit.api.controller.ProjectController.saveProject
     */
    saveProject(dto: ProjectDto, options?: O): RestResponse<ApiResponse<ProjectDto>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/project`, data: dto, options: options });
    }

    /**
     * HTTP PUT /api/project
     * Java method: com.makeit.api.controller.ProjectController.updateProject
     */
    updateProject(dto: ProjectDto, options?: O): RestResponse<ApiResponse<ProjectDto>> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/project`, data: dto, options: options });
    }

    /**
     * HTTP PATCH /api/project/change/status/{projectId}
     * Java method: com.makeit.api.controller.ProjectController.changeStatus
     */
    changeStatus(projectId: number, options?: O): RestResponse<ApiResponse<boolean>> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/project/change/status/${projectId}`, options: options });
    }

    /**
     * HTTP GET /api/project/of/category/{categoryId}
     * Java method: com.makeit.api.controller.ProjectController.getProjects
     */
    getProjects(categoryId: number, queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<ProjectDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/project/of/category/${categoryId}`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/project/projects/{projectId}
     * Java method: com.makeit.api.controller.ProjectController.getUserProjects
     */
    getUserProjects(projectId: number, queryParams: { status: UserStatusType; }, options?: O): RestResponse<ApiResponse<UserDto[]>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/project/projects/${projectId}`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/project/top/ten
     * Java method: com.makeit.api.controller.ProjectController.getLastTenProjects
     */
    getLastTenProjects(options?: O): RestResponse<ApiResponse<TopProjectDto[]>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/project/top/ten`, options: options });
    }

    /**
     * HTTP DELETE /api/project/{id}
     * Java method: com.makeit.api.controller.ProjectController.deleteProject
     */
    deleteProject(id: number, options?: O): RestResponse<ApiResponse<ProjectDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/project/${id}`, options: options });
    }

    /**
     * HTTP GET /api/project/{id}
     * Java method: com.makeit.api.controller.ProjectController.getProject
     */
    getProject(id: number, options?: O): RestResponse<ApiResponse<ProjectDto>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/project/${id}`, options: options });
    }
}

export class RoleClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/role
     * Java method: com.makeit.api.controller.RoleController.getRoles
     */
    getRoles(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<RoleDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/role`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP POST /api/role
     * Java method: com.makeit.api.controller.RoleController.saveRole
     */
    saveRole(dto: RoleDto, options?: O): RestResponse<ApiResponse<RoleDto>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/role`, data: dto, options: options });
    }

    /**
     * HTTP PUT /api/role
     * Java method: com.makeit.api.controller.RoleController.updateRole
     */
    updateRole(dto: RoleDto, options?: O): RestResponse<ApiResponse<RoleDto>> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/role`, data: dto, options: options });
    }

    /**
     * HTTP DELETE /api/role/{id}
     * Java method: com.makeit.api.controller.RoleController.deleteRole
     */
    deleteRole(id: number, options?: O): RestResponse<ApiResponse<RoleDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/role/${id}`, options: options });
    }

    /**
     * HTTP GET /api/role/{id}
     * Java method: com.makeit.api.controller.RoleController.getRole
     */
    getRole(id: number, options?: O): RestResponse<ApiResponse<RoleDto>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/role/${id}`, options: options });
    }
}

export class SkillClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/skill
     * Java method: com.makeit.api.controller.SkillController.getSkills
     */
    getSkills(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<SkillDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/skill`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP POST /api/skill
     * Java method: com.makeit.api.controller.SkillController.saveSkill
     */
    saveSkill(dto: SkillDto, options?: O): RestResponse<ApiResponse<SkillDto>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/skill`, data: dto, options: options });
    }

    /**
     * HTTP PUT /api/skill
     * Java method: com.makeit.api.controller.SkillController.updateSkill
     */
    updateSkill(dto: SkillDto, options?: O): RestResponse<ApiResponse<SkillDto>> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/skill`, data: dto, options: options });
    }

    /**
     * HTTP POST /api/skill/all
     * Java method: com.makeit.api.controller.SkillController.saveSkills
     */
    saveSkills(dtos: SkillDto[], options?: O): RestResponse<ApiResponse<SkillDto[]>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/skill/all`, data: dtos, options: options });
    }

    /**
     * HTTP DELETE /api/skill/{id}
     * Java method: com.makeit.api.controller.SkillController.deleteSkill
     */
    deleteSkill(id: number, options?: O): RestResponse<ApiResponse<SkillDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/skill/${id}`, options: options });
    }

    /**
     * HTTP GET /api/skill/{id}
     * Java method: com.makeit.api.controller.SkillController.getSkill
     */
    getSkill(id: number, options?: O): RestResponse<ApiResponse<SkillDto>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/skill/${id}`, options: options });
    }
}

export class TagClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/tag
     * Java method: com.makeit.api.controller.TagController.getTags
     */
    getTags(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<TagDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/tag`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP POST /api/tag
     * Java method: com.makeit.api.controller.TagController.saveTag
     */
    saveTag(dto: TagDto, options?: O): RestResponse<ApiResponse<TagDto>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/tag`, data: dto, options: options });
    }

    /**
     * HTTP PUT /api/tag
     * Java method: com.makeit.api.controller.TagController.updateTag
     */
    updateTag(dto: TagDto, options?: O): RestResponse<ApiResponse<TagDto>> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/tag`, data: dto, options: options });
    }

    /**
     * HTTP DELETE /api/tag/{id}
     * Java method: com.makeit.api.controller.TagController.deleteTag
     */
    deleteTag(id: number, options?: O): RestResponse<ApiResponse<TagDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/tag/${id}`, options: options });
    }

    /**
     * HTTP GET /api/tag/{id}
     * Java method: com.makeit.api.controller.TagController.getTag
     */
    getTag(id: number, options?: O): RestResponse<ApiResponse<TagDto>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/tag/${id}`, options: options });
    }
}

export class TaskClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP GET /api/task
     * Java method: com.makeit.api.controller.TaskController.getTasks
     */
    getTasks(queryParams?: { page?: number; size?: number; sort?: string; }, options?: O): RestResponse<ApiResponse<Page<TaskDto>>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/task`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP POST /api/task
     * Java method: com.makeit.api.controller.TaskController.saveTask
     */
    saveTask(dto: TaskDto, options?: O): RestResponse<ApiResponse<TaskDto>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/task`, data: dto, options: options });
    }

    /**
     * HTTP PUT /api/task
     * Java method: com.makeit.api.controller.TaskController.updateTask
     */
    updateTask(dto: TaskDto, options?: O): RestResponse<ApiResponse<TaskDto>> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/task`, data: dto, options: options });
    }

    /**
     * HTTP DELETE /api/task/{id}
     * Java method: com.makeit.api.controller.TaskController.deleteTask
     */
    deleteTask(id: number, options?: O): RestResponse<ApiResponse<TaskDto>> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/task/${id}`, options: options });
    }

    /**
     * HTTP GET /api/task/{id}
     * Java method: com.makeit.api.controller.TaskController.getTask
     */
    getTask(id: number, options?: O): RestResponse<ApiResponse<TaskDto>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/task/${id}`, options: options });
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
     * HTTP GET /api/user/history
     * Java method: com.makeit.api.controller.UserController.getUserHistory
     */
    getUserHistory(options?: O): RestResponse<ApiResponse<HistoryDto[]>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/user/history`, options: options });
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
    url: string;
    name: string;
    description: string;

    static fromData(data: Category, target?: Category): Category {
        if (!data) {
            return data;
        }
        const instance = target || new Category();
        instance.id = data.id;
        instance.url = data.url;
        instance.name = data.name;
        instance.description = data.description;
        return instance;
    }
}

export class CategoryDto {
    id: number;
    url: string;
    name: string;
    description: string;

    static fromData(data: CategoryDto, target?: CategoryDto): CategoryDto {
        if (!data) {
            return data;
        }
        const instance = target || new CategoryDto();
        instance.id = data.id;
        instance.url = data.url;
        instance.name = data.name;
        instance.description = data.description;
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
    type: CommentType;

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
        instance.type = data.type;
        return instance;
    }
}

export class CommentDto {
    id: number;
    commentator: UserDto;
    title: string;
    description: string;
    parent: CommentDto;
    replies: CommentDto[];
    type: CommentType;
    belongTo: number;
    createdAt: Date;

    static fromData(data: CommentDto, target?: CommentDto): CommentDto {
        if (!data) {
            return data;
        }
        const instance = target || new CommentDto();
        instance.id = data.id;
        instance.commentator = UserDto.fromData(data.commentator);
        instance.title = data.title;
        instance.description = data.description;
        instance.parent = CommentDto.fromData(data.parent);
        instance.replies = __getCopyArrayFn(CommentDto.fromData)(data.replies);
        instance.type = data.type;
        instance.belongTo = data.belongTo;
        instance.createdAt = data.createdAt;
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

export class CompanyDto {
    id: number;
    name: string;
    description: string;
    logo: string;
    owner: UserDto;

    static fromData(data: CompanyDto, target?: CompanyDto): CompanyDto {
        if (!data) {
            return data;
        }
        const instance = target || new CompanyDto();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.logo = data.logo;
        instance.owner = UserDto.fromData(data.owner);
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

export class HistoryDto {
    type: HistoryType;
    commentType: CommentType;
    userStatus: UserStatusType;
    project: ProjectDto;
    comment: CommentDto;
    createdAt: Date;
    belongTo: any;
    dated: boolean;

    static fromData(data: HistoryDto, target?: HistoryDto): HistoryDto {
        if (!data) {
            return data;
        }
        const instance = target || new HistoryDto();
        instance.type = data.type;
        instance.commentType = data.commentType;
        instance.userStatus = data.userStatus;
        instance.project = ProjectDto.fromData(data.project);
        instance.comment = CommentDto.fromData(data.comment);
        instance.createdAt = data.createdAt;
        instance.belongTo = data.belongTo;
        instance.dated = data.dated;
        return instance;
    }
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

export interface Page<T> {
    totalElements: number;
    totalPages: number;
    size: number;
    content: T[];
    number: number;
    sort: Sort;
    last: boolean;
    first: boolean;
    pageable: Pageable;
    numberOfElements: number;
    empty: boolean;
}

export interface Pageable {
    offset: number;
    sort: Sort;
    unpaged: boolean;
    pageNumber: number;
    paged: boolean;
    pageSize: number;
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

export class Payment {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    id: number;
    cardNumber: string;
    cardHolder: string;
    cardExpireDate: string;
    beneficiaryName: string;
    remittanceInfo: string;
    currency: CurrencyType;
    rate: number;
    attestation: boolean;

    static fromData(data: Payment, target?: Payment): Payment {
        if (!data) {
            return data;
        }
        const instance = target || new Payment();
        super.fromData(data, instance);
        instance.createdAt = data.createdAt;
        instance.updatedAt = data.updatedAt;
        instance.createdBy = data.createdBy;
        instance.updatedBy = data.updatedBy;
        instance.id = data.id;
        instance.cardNumber = data.cardNumber;
        instance.cardHolder = data.cardHolder;
        instance.cardExpireDate = data.cardExpireDate;
        instance.beneficiaryName = data.beneficiaryName;
        instance.remittanceInfo = data.remittanceInfo;
        instance.currency = data.currency;
        instance.rate = data.rate;
        instance.attestation = data.attestation;
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
    description: string;
    address: Address;
    payment: Payment;

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
        instance.description = data.description;
        instance.address = Address.fromData(data.address);
        instance.payment = Payment.fromData(data.payment);
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
    logo: string;
    description: string;
    company: Company;
    category: Category;
    fixedRate: boolean;
    fixedTime: boolean;
    ratePerHour: number;
    rateCurrency: string;
    minDuration: number;
    maxDuration: number;
    requiredLevel: number;
    loe: number;
    proposals: number;
    active: boolean;
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
        instance.logo = data.logo;
        instance.description = data.description;
        instance.company = Company.fromData(data.company);
        instance.category = Category.fromData(data.category);
        instance.fixedRate = data.fixedRate;
        instance.fixedTime = data.fixedTime;
        instance.ratePerHour = data.ratePerHour;
        instance.rateCurrency = data.rateCurrency;
        instance.minDuration = data.minDuration;
        instance.maxDuration = data.maxDuration;
        instance.requiredLevel = data.requiredLevel;
        instance.loe = data.loe;
        instance.proposals = data.proposals;
        instance.active = data.active;
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

export class ProjectDto {
    id: number;
    logo: string;
    name: string;
    description: string;
    company: CompanyDto;
    category: CategoryDto;
    fixedRate: boolean;
    fixedTime: boolean;
    ratePerHour: number;
    rateCurrency: string;
    minDuration: number;
    maxDuration: number;
    owner: UserDto;
    rating: number;
    requiredLevel: number;
    loe: number;
    proposals: number;
    active: boolean;
    createdAt: Date;

    static fromData(data: ProjectDto, target?: ProjectDto): ProjectDto {
        if (!data) {
            return data;
        }
        const instance = target || new ProjectDto();
        instance.id = data.id;
        instance.logo = data.logo;
        instance.name = data.name;
        instance.description = data.description;
        instance.company = CompanyDto.fromData(data.company);
        instance.category = CategoryDto.fromData(data.category);
        instance.fixedRate = data.fixedRate;
        instance.fixedTime = data.fixedTime;
        instance.ratePerHour = data.ratePerHour;
        instance.rateCurrency = data.rateCurrency;
        instance.minDuration = data.minDuration;
        instance.maxDuration = data.maxDuration;
        instance.owner = UserDto.fromData(data.owner);
        instance.rating = data.rating;
        instance.requiredLevel = data.requiredLevel;
        instance.loe = data.loe;
        instance.proposals = data.proposals;
        instance.active = data.active;
        instance.createdAt = data.createdAt;
        return instance;
    }
}

export class RateDto {
    currency: CurrencyType;
    rate: number;

    static fromData(data: RateDto, target?: RateDto): RateDto {
        if (!data) {
            return data;
        }
        const instance = target || new RateDto();
        instance.currency = data.currency;
        instance.rate = data.rate;
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

    static fromData(data: Role, target?: Role): Role {
        if (!data) {
            return data;
        }
        const instance = target || new Role();
        instance.id = data.id;
        instance.roleName = data.roleName;
        return instance;
    }
}

export class RoleDto {
    id: number;
    roleName: RoleName;

    static fromData(data: RoleDto, target?: RoleDto): RoleDto {
        if (!data) {
            return data;
        }
        const instance = target || new RoleDto();
        instance.id = data.id;
        instance.roleName = data.roleName;
        return instance;
    }
}

export class Skill {
    id: number;
    name: string;
    description: string;
    category: number;

    static fromData(data: Skill, target?: Skill): Skill {
        if (!data) {
            return data;
        }
        const instance = target || new Skill();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.category = data.category;
        return instance;
    }
}

export class SkillDto {
    id: number;
    name: string;
    description: string;
    category: number;

    static fromData(data: SkillDto, target?: SkillDto): SkillDto {
        if (!data) {
            return data;
        }
        const instance = target || new SkillDto();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.category = data.category;
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

export class SkillRatingDto {
    user: UserDto;
    skill: SkillDto;
    rating: number;

    static fromData(data: SkillRatingDto, target?: SkillRatingDto): SkillRatingDto {
        if (!data) {
            return data;
        }
        const instance = target || new SkillRatingDto();
        instance.user = UserDto.fromData(data.user);
        instance.skill = SkillDto.fromData(data.skill);
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

export class Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;

    static fromData(data: Sort, target?: Sort): Sort {
        if (!data) {
            return data;
        }
        const instance = target || new Sort();
        instance.sorted = data.sorted;
        instance.unsorted = data.unsorted;
        instance.empty = data.empty;
        return instance;
    }
}

export class Tag {
    id: number;
    name: string;
    description: string;
    categoryId: number;

    static fromData(data: Tag, target?: Tag): Tag {
        if (!data) {
            return data;
        }
        const instance = target || new Tag();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.categoryId = data.categoryId;
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

export class TaskDto {
    id: number;
    name: string;
    description: string;
    complexity: number;
    duration: number;
    projectId: number;
    parentTaskId: number;
    progressStatus: number;
    statedAt: Date;
    overdone: boolean;

    static fromData(data: TaskDto, target?: TaskDto): TaskDto {
        if (!data) {
            return data;
        }
        const instance = target || new TaskDto();
        instance.id = data.id;
        instance.name = data.name;
        instance.description = data.description;
        instance.complexity = data.complexity;
        instance.duration = data.duration;
        instance.projectId = data.projectId;
        instance.parentTaskId = data.parentTaskId;
        instance.progressStatus = data.progressStatus;
        instance.statedAt = data.statedAt;
        instance.overdone = data.overdone;
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
    legalBusiness: string;
    rate: RateDto;

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
        instance.legalBusiness = data.legalBusiness;
        instance.rate = RateDto.fromData(data.rate);
        return instance;
    }
}

export class TopProjectDto {
    id: number;
    name: string;
    logo: string;
    owner: UserDto;
    description: string;
    address: AddressDto;
    ratePerHour: number;
    rateCurrency: string;
    minDuration: number;
    maxDuration: number;
    proposals: number;
    createdAt: Date;

    static fromData(data: TopProjectDto, target?: TopProjectDto): TopProjectDto {
        if (!data) {
            return data;
        }
        const instance = target || new TopProjectDto();
        instance.id = data.id;
        instance.name = data.name;
        instance.logo = data.logo;
        instance.owner = UserDto.fromData(data.owner);
        instance.description = data.description;
        instance.address = AddressDto.fromData(data.address);
        instance.ratePerHour = data.ratePerHour;
        instance.rateCurrency = data.rateCurrency;
        instance.minDuration = data.minDuration;
        instance.maxDuration = data.maxDuration;
        instance.proposals = data.proposals;
        instance.createdAt = data.createdAt;
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
    profile: Profile;
    active: boolean;
    emailVerified: boolean;
    roles: Role[];

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
        instance.profile = Profile.fromData(data.profile);
        instance.active = data.active;
        instance.emailVerified = data.emailVerified;
        instance.roles = __getCopyArrayFn(Role.fromData)(data.roles);
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
    userId: number;
    commentId: number;

    static fromData(data: UserCommentId, target?: UserCommentId): UserCommentId {
        if (!data) {
            return data;
        }
        const instance = target || new UserCommentId();
        instance.userId = data.userId;
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

export class UserDto {
    id: number;
    username: string;
    profile: BaseProfileDto;

    static fromData(data: UserDto, target?: UserDto): UserDto {
        if (!data) {
            return data;
        }
        const instance = target || new UserDto();
        instance.id = data.id;
        instance.username = data.username;
        instance.profile = BaseProfileDto.fromData(data.profile);
        return instance;
    }
}

export class UserProject {
    id: UserProjectId;
    user: User;
    project: Project;
    rating: number;
    userStatus: UserStatusType;
    userOwner: boolean;
    userCreator: boolean;

    static fromData(data: UserProject, target?: UserProject): UserProject {
        if (!data) {
            return data;
        }
        const instance = target || new UserProject();
        instance.id = UserProjectId.fromData(data.id);
        instance.user = User.fromData(data.user);
        instance.project = Project.fromData(data.project);
        instance.rating = data.rating;
        instance.userStatus = data.userStatus;
        instance.userOwner = data.userOwner;
        instance.userCreator = data.userCreator;
        return instance;
    }
}

export class UserProjectDto {
    userId: number;
    projectId: number;

    static fromData(data: UserProjectDto, target?: UserProjectDto): UserProjectDto {
        if (!data) {
            return data;
        }
        const instance = target || new UserProjectDto();
        instance.userId = data.userId;
        instance.projectId = data.projectId;
        return instance;
    }
}

export class UserProjectId {
    userId: number;
    projectId: number;

    static fromData(data: UserProjectId, target?: UserProjectId): UserProjectId {
        if (!data) {
            return data;
        }
        const instance = target || new UserProjectId();
        instance.userId = data.userId;
        instance.projectId = data.projectId;
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

export const enum CommentType {
    PROJECT = "PROJECT",
    USER = "USER",
    TASK = "TASK",
}

export const enum CurrencyType {
    UAH = "UAH",
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
}

export const enum DeviceType {
    DEVICE_TYPE_ANDROID = "DEVICE_TYPE_ANDROID",
    DEVICE_TYPE_IOS = "DEVICE_TYPE_IOS",
    DEVICE_TYPE_PC_BOX = "DEVICE_TYPE_PC_BOX",
}

export const enum HistoryType {
    PROJECT = "PROJECT",
    COMMENT = "COMMENT",
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

export const enum UserStatusType {
    HIRE_ME = "HIRE_ME",
    HIRED = "HIRED",
    DECLINED = "DECLINED",
    UNKNOWN = "UNKNOWN",
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

export class AxiosCategoryClient extends CategoryClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosCommentClient extends CommentClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosCompanyClient extends CompanyClient<Axios.AxiosRequestConfig> {

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

export class AxiosProjectClient extends ProjectClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosRoleClient extends RoleClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosSkillClient extends SkillClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosTagClient extends TagClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosTaskClient extends TaskClient<Axios.AxiosRequestConfig> {

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

declare namespace Kubernetes {
  interface Manifest {}
  interface Resource {}
}

declare module "kubernetes-client" {
  interface AuthorizationConfiguration {
    bearer?: string;
    user?: {
      username: string;
      password: string;
    }
  }

  interface ClusterConfiguration {
    url: string;
    ca: string;
    auth: AuthorizationConfiguration;
    namespace: string;
    insecureSkipTlsVerify?: boolean;
  }

  function getInCluster() : ClusterConfiguration;
  function fromKubeconfig(kubeconfig: any, current: any): ClusterConfiguration;
  function loadKubeconfig(cfgPath?: string): any; 

  interface ApiClientOptions {
    core?: CoreOptions;
    extensions?: ExtensionsOptions;
    apps?: AppsOptions;
    batch?: BatchOptions;
    rbac?: RbacOptions;
  }

  class Api {
    constructor(options?: ApiClientOptions);    
    group(v: Kubernetes.Manifest | string): ApiGroup;
  }

  interface BatchOptions extends CoreOptions { }
  interface AppsOptions extends CoreOptions { }
  interface RbacOptions extends CoreOptions { }
  interface ExtensionsOptions extends CoreOptions { }
  interface ThirdPartyResourceOptions extends ApiGroupOptions { 
    group: string;
    resources: Array<string | ResourceConstructor>;
  }

  class Extensions extends ApiGroup {
    constructor(options: ExtensionsOptions);
  }

  interface ThirdPartyResources extends ApiGroup { 
    constructor(options: ThirdPartyResourceOptions);
  }

  class Apps extends ApiGroup {
    constructor(options: AppsOptions);
  }  

  class Batch extends ApiGroup {
    constructor(options: BatchOptions);
  }

  class Rbac extends ApiGroup {
    constructor(options: RbacOptions);
  }

  interface testUtils {
    aliasResources: (resourceObject: string) => void;
  }

  interface ResourceConstructor {
    name: string;
    Constructor: Function;
  }

  interface ApiGroupOptions extends ApiGroupOptions { 
    url: string;
    version?: string;
    namespace?: string;
    ca?: string;
    cert?: string;
    key?: string;
    insecureSkipTlsVerify?: boolean;
  }

  interface InternalApiGroupOptions {
    url: string;
    version: string;
    namespace?: string;
    ca: string;
    cert: string;
    key: string;
    insecureSkipTlsVerify: boolean;
  }

  interface ApiRequestOptions {
    body: any;
    headers: any;
    path: string;
    qs: any;
  }

  interface ResourceOptions {
    api: string;
    name: string;
    parentPath: string;
    fn?: Function;
    qs?: any;
  }

  interface MatchExpression {
    key: string;
    operator: string;
    values: Array<any>;
  }

  class Resource {
    constructor(options: ResourceOptions);
    _name: string
    api: string;
    parentPath: string;
    path: string;
    fn?: Function;
    qs?: any;

    get(options: ApiRequestOptions | string, callback: (any, any) => void): any;
    patch(options: ApiRequestOptions | string, callback: (any, any) => void): any;
    post(options: ApiRequestOptions | string, callback: (any, any) => void): any;
    put(options: ApiRequestOptions | string, callback: (any, any) => void): any;
    match(expressions: Array<MatchExpression>): Resource;
    matchLabels(labels: Array<any>): Resource;
    getStream(options: ApiRequestOptions | string): any;
  }
  
  class ApiGroup {
    constructor(options: ApiGroupOptions);
    addResource(options: string | ResourceConstructor);
    _url(path: string);
    _request(method: string, options: ApiRequestOptions);
    get(options: ApiRequestOptions, callback: (any, any) => void): any;
    delete(options: ApiRequestOptions, callback: (any, any) => void);
    patch(options: ApiRequestOptions, callback: (any, any) => void);
    post(options: ApiRequestOptions, callback: (any, any) => void);
    put(options: ApiRequestOptions, callback: (any, any) => void);

    // Resources
    clusterroles?: Resource;
    clusterrolebindings?: Resource;
    componentstatuses?: Resource;
    configmaps?: Resource;
    cronjobs?: Resource;
    daemonsets?: Resource;
    deployments?: Resource;
    events?: Resource;
    endpoints?: Resource;
    horizontalpodaudoscalers?: Resource;
    ingresses?: Resource;
    jobs?: Resource;
    limitranges?: Resource;
    namespaces?: Resource;
    nodes?: Resource;
    persistentvolumes?: Resource;
    persistentvolumeclaims?: Resource;
    petsets?: Resource;
    pods?: Resource;
    replicationcontrollers?: Resource;
    replicasets?: Resource;
    resourcequotas?: Resource;
    roles?: Resource;
    rolebindings?: Resource;
    scheduledjobs?: Resource;
    secrets?: Resource;
    serviceaccounts?: Resource;
    services?: Resource;
    statefulsets?: Resource;
    thirdpartyresources?: Resource;

    // Resource Aliases
    cs?: Resource;
    cm?: Resource;
    ds?: Resource;
    deploy?: Resource;
    ev?: Resource;
    ep?: Resource;
    hpa?: Resource;
    ing?: Resource;
    limits?: Resource;
    ns?: Resource;
    no?: Resource;
    pv?: Resource;
    pvc?: Resource;
    po?: Resource;
    rc?: Resource;
    rs?: Resource;
    quota?: Resource;
    svc?: Resource;

    clusterroles?: Resource;
    clusterroles?: Resource;
    clusterroles?: Resource;
    clusterroles?: Resource;
    clusterroles?: Resource;
    clusterroles?: Resource;
  }

  export default class Core extends ApiGroup {
    constructor(options: CoreOptions);
  }
}

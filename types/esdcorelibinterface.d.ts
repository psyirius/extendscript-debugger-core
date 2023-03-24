declare module 'esdcorelibinterface' {
    export enum ESDCoreStatus {
        UNDEFINED = -2,
        FAILED = -1,
        SUCCESS = 0,
        SCRIPTHOST_INIT_FAILED = 1,
        DEBUGGER_SCRIPTS_LOAD_FAILED = 2,
        INIT_FAILED = 3,
        DESTROY_FAILED = 4,
        TARGETS_FETCH_FAILED = 5,
        BUFFER_LENGTH_LESS = 6,
        SESSION_ENGINES_FETCH_FAILED = 7,
        NO_SUCH_DEBUG_COMMAND = 8,
        SCRIPT_EXECUTION_NO_RESULT = 9,
        CLIENT_CONTEXT_NULL = 10,
        ALREADY_INITIALIZED = 11,
        NOT_INITIALIZED = 12,
        NO_LAST_ERROR_INFO = 13,
        ES_ENGINE_NO_ERROR = 14,
        ES_ENGINE_ERROR = 15,
        JSX_COMPILATION_FAILED = 16,
    }

    interface ESDCoreResult {
        status: ESDCoreStatus;
    }

    interface ESDCoreInitializationResult extends ESDCoreResult {
    }

    interface ESDCoreCompilationResult extends ESDCoreResult {

        error?: string;

        output?: string;
    }

    interface ESDCoreSyntaxCheckResult extends ESDCoreResult {

        result: string;
    }

    export function esdInitialize(spec: string, processId: number): ESDCoreInitializationResult;

    export function esdIsInitialized(): boolean;

    export function esdCompileToJSXBin(source: string, scriptId: string, includePath: string): ESDCoreCompilationResult;

    export function esdCheckSyntax(source: string, scriptId: string, includePath: string): ESDCoreSyntaxCheckResult;

    export function esdCleanup(): ESDCoreInitializationResult;
}

declare module 'esdcorelibinterface.node' {
    export * from 'esdcorelibinterface';
}
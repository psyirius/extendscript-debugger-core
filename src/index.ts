// Copyright 2022 Adobe. All rights reserved.
// This file is licensed to you under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may obtain a copy
// of the License at http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under
// the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
// OF ANY KIND, either express or implied. See the License for the specific language
// governing permissions and limitations under the License.

/// <reference types="../types/esdcorelibinterface" />

import path from 'path';
import esdcorelibinterface from "esdcorelibinterface";

const libName = 'esdcorelibinterface.node';

type CpuArch = 'ia32' | 'x64' | any;
type ESDPlatform = `${NodeJS.Platform}-${CpuArch}`;

type ESDCoreInterface = typeof esdcorelibinterface;

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

export const SupportedPlatforms: ESDPlatform[] = [
    'win32-ia32',
    'win32-x64',
    'darwin-x64',
];

function GetCurrentPlatform(): ESDPlatform {
    return `${process.platform}-${process.arch}`;
}

function IsCurrentPlatformSupported(): boolean {
    return SupportedPlatforms.includes(GetCurrentPlatform());
}

function getESDLibPath(): string {
    return path.join(path.dirname(__dirname), 'lib', process.platform, process.arch, libName)
}

let _coreLib: ESDCoreInterface;

export function getInterface(): ESDCoreInterface {
    if (_coreLib === undefined) {
        if (!IsCurrentPlatformSupported()) {
            throw new Error("Could not initialize Core Library! Is this running on a supported platform?");
        }

        const libPath = getESDLibPath();

        _coreLib = require(libPath) as typeof esdcorelibinterface;
    }

    return _coreLib;
}
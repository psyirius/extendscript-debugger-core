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
    return path.join(path.dirname(__dirname), 'bin', process.platform, process.arch, libName)
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
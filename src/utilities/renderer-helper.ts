import axios from 'axios';
import configurations from '../configurations';
import Role from '../features/permissions/roles';
import * as _ from 'lodash';

const rendererAxios = axios.create({
    baseURL: configurations.renderer.url,
    responseType: 'json',
});

export const RENDERER_ENDPOINT = '/rendered';

export enum OutputFormat {
    SINGLE = 'single',
    SIMPLE = 'simple'
}

export interface GetProblemParameters {
    sourceFilePath?: string;
    problemSeed?: number;
    formURL: string;
    baseURL?: string;
    outputformat?: OutputFormat;
    problemSource?: boolean;
    format?: string;
    lanugage?: string;
    showHints?: boolean;
    showSolutions?: boolean | number;
    permissionLevel?: number | number;
    problemNumber?: number;
    numCorrect?: number;
    numIncorrect?: number;
    processAnswers?: boolean;
}

class RendererHelper {
    getOutputFormatForPermission = (permissionLevel: number): OutputFormat => {
        if (permissionLevel < 10) {
            return OutputFormat.SINGLE;
        } else {
            return OutputFormat.SIMPLE;
        }
    };

    getPermissionForRole = (role: Role): number => {
        switch(role) {
            case Role.STUDENT:
                return 0;
            case Role.PROFESSOR:
                return 10;
            case Role.ADMIN:
                return 20;
            default:
                return -1;
        }
    }

    getOutputFormatForRole = (role: Role): OutputFormat => this.getOutputFormatForPermission(this.getPermissionForRole(role));


    async getProblem({
        sourceFilePath,
        problemSource,
        problemSeed,
        formURL,
        baseURL = '/',
        outputformat,
        lanugage,
        showHints,
        showSolutions,
        permissionLevel,
        problemNumber,
        numCorrect,
        numIncorrect,
        processAnswers,
        format = 'json',
        
    }: GetProblemParameters): Promise<unknown> {
        const resp = await rendererAxios.get(RENDERER_ENDPOINT, {
            params: {
                sourceFilePath,
                problemSource,
                problemSeed,
                formURL,
                baseURL,
                outputformat,
                format,
                lanugage,
                showHints: _.isNil(showHints) ? undefined : Number(showHints),
                showSolutions: Number(showSolutions),
                permissionLevel,
                problemNumber,
                numCorrect,
                numIncorrect,
                processAnswers,
            },
        });

        return resp.data;
    }
}

const rendererHelper = new RendererHelper();
export default rendererHelper;

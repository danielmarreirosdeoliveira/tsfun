import {isArray, isEmpty, isObject} from './predicate';
import {reverseUncurry2} from './core';
import {ObjectStruct, Predicate, UntypedObjectCollection} from './type';
import {on} from './comparator';
import {val} from "./composition";


// ------------ @author Daniel de Oliveira -----------------

export const jsonClone = <T>(object: T) => JSON.parse(JSON.stringify(object)) as T;


export function clone<T>(struct: boolean, f?: Function): boolean;
export function clone<T>(struct: string, f?: Function): string;
export function clone<T>(struct: number, f?: Function): number;
export function clone<T>(struct: undefined, f?: Function): undefined;
export function clone<T>(struct: T, f?: Function): T;
export function clone<T>(struct: T|undefined|number|string|boolean, f?: Function): T|undefined|number|string|boolean {

    if (struct === undefined) return undefined;
    if (typeof struct === 'boolean') return struct as boolean;
    if (typeof struct === 'string') return struct as string;
    if (typeof struct === 'number') return struct as number;

    if (isArray(struct)) {

        return (struct as unknown as Array<any>).reduce((klone: Array<any>, val: any) => {
            klone.push(clone(val, f));
            return klone;
        }, []) as T

    } else if (isObject(struct)) {

        return (Object.keys(struct as any)).reduce((klone, k: any) =>{
            (klone as any)[k] = clone((struct as any)[k], f);
            return klone;
        }, {} as ObjectStruct) as T;

    } else {

        return (f ? f(struct) : jsonClone(struct)) as T;
    }
}


export const getOnOr = <T>(path: string, alternative: any) => (ds: ObjectStruct) => {

    const result = getElForPathIn(ds as Object, path);
    return result !== undefined
        ? result
        : alternative;
};


export const getOn = <T>(ds: ObjectStruct) => (path: string) => {

    const result = getOnOr(path, undefined)(ds);
    if (result === undefined) throw Error('getOn, got nothing');
    return result;
};


function calcProps(path: string) {

    let dot = path.indexOf('.');
    let leftBracket = path.indexOf('[');
    let rightBracket = path.indexOf(']');
    let newPath = path;
    if (dot === 0) {
        newPath = newPath.substring(1, newPath.length);
        dot = newPath.indexOf('.');
        leftBracket = newPath.indexOf('[');
        rightBracket = newPath.indexOf(']');
    }
    return {dot, leftBracket, rightBracket, newPath};
}


function makeValueForCurrentKey(resultSegment: any) {
    return (resultSegment
        || resultSegment === ''
        || resultSegment === 0
        || resultSegment === false)
        ? resultSegment
        : undefined;
}


function evaulateKeyAndPath(valueForCurrentKey: any, remainingPath: string) {

    if (remainingPath.length < 1) return valueForCurrentKey as any;
    if (valueForCurrentKey === undefined) return undefined;
    return getElForPathIn(valueForCurrentKey, remainingPath) as any;
}


// library internal
export function getElForPathIn(object: any, path: string): any {

    const isObject_ = (o: any) => o instanceof Object;

    const {dot, leftBracket, rightBracket, newPath} = calcProps(path);

    if (dot === -1 && leftBracket === -1) {

        if (isObject_(object)) return makeValueForCurrentKey(object[newPath]);
        else return undefined;
    }

    if (leftBracket === 0) {
        if (!isArray(object)) return undefined;
        const relevantSegment = newPath.substring(leftBracket + 1, rightBracket);
        let i = parseInt(relevantSegment);

        return evaulateKeyAndPath(
            makeValueForCurrentKey(object[i]),
            newPath.substring(rightBracket + 1));
    }

    if (dot !== -1 || leftBracket !== -1) {
        if (!isObject_(object)) return undefined;

        let i =
            dot === -1 && leftBracket > -1
                ? leftBracket
                : dot > -1 && leftBracket === -1
                    ? dot
                    : dot < leftBracket
                        ? dot
                        : leftBracket;

        return evaulateKeyAndPath(
            makeValueForCurrentKey(object[newPath.substring(0, i)]),
            newPath.substring(i));
    }

    return undefined;
}



export function setOn(object: any, path: string) {

    return (val: any): void => {

        const segments = path.split('.');

        segments.reduce((currentLevel, segment, i) => {
            if (i === segments.length - 1) { // last segment
                currentLevel[segment] = val;
                return currentLevel; // does not matter
            } else {
                if (!currentLevel[segment]) currentLevel[segment] = {};
                return currentLevel[segment];
            }
        }, object);
    }
}


export function update(path: string, update_fun?: (val: any) => any) {

    return (object: ObjectStruct) => {

        if (!path.includes('.')) {

            const copied = Object.assign({}, object) as UntypedObjectCollection;
            if (update_fun) copied[path] = update_fun((object as any)[path]);
            else delete copied[path];
            return copied;
        }

        const splittedPath = path.split('.');
        const copied = Object.assign({}, object) as UntypedObjectCollection;

        const firstElem = splittedPath[0];
        splittedPath.shift();
        copied[firstElem] = update(splittedPath.join('.'), update_fun)((object as any)[firstElem]);
        return copied;
    }
}


export const assoc = (path: string, v: any) => update(path, val(v));


export const dissoc = (path: string) => update(path);


export const to = reverseUncurry2(getElForPathIn);


/* experimental */ export const sameOn = <T>(path: string, l: T, r: T) =>
    on(path)(l)(r);


/* experimental */ export const option = <A>(f: Predicate<A>) =>
    (a: A) => f(a) ? a : {};


/* experimental */ export const mapOption = <A>(f: (a: A) => A) =>
    (a: A) => isEmpty(a) ? {} : f(a);
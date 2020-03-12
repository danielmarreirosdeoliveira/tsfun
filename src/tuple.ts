import {identity} from './core';
import {Either, Fallible, Maybe, Pair} from './type';
import {isArray, isEither, isMaybe, isSuccess} from './predicate';


export function tuplify(...fs : any[]) {

    return (s: any) => fs.map(f => f(s));
}


export function pairWith(f: any) {

    return tuplify(identity, f);
}


export function left<T>(pair: Pair<T,any>|Either<T,any>): T {

    if (pair.length !== 2) throw Error("Illegal argument: Pair/Either must have length 2");
    return pair[0] as T;
}


export function right<T>(pair: Pair<any, T>|Either<any,T>): T {

    if (pair.length !== 2) throw Error("Illegal argument: Pair/Either must have length 2");
    return pair[1] as T;
}


export function swap<S, T>([l, r]: Pair<S, T>): Pair<T, S> {

    return [r, l] as Pair<T, S>
}


export function just<T = any>(v: T): Maybe<T> {

    return [v];
}


export function nothing<T = any>(): Maybe<T> {

    return [];
}


export function success<L = string, R = any>(v: R): Either<L, R> {

    return [undefined, v];
}


export function failure<L = string, R = any>(v: L): Either<L, R> {

    return [v, undefined];
}


export function liftM<T, R>(f: (x: T) => R): (x: T) => Maybe<R>;
export function liftM<T, R>(f: (...x: T[]) => R): (...x: T[]) => Maybe<R>;
export function liftM<T,R>(f: (x: T) => R) {

    return (...x: T[]): Maybe<R> => {

        try {
            return [isArray(x) ? (f as any)(...x) : (f as any)(x)];
        } catch {
            return [];
        }
    }
}


export function liftE<T,R>(f: (x: T) => R): (x: T) => Either<any, R>;
export function liftE<T,R>(f: (...x: T[]) => R): (...x: T[]) => Either<any, R>;
export function liftE<T,R>(f: (...x: T[]) => R) {

    return (...x: Array<T>): Either<any, R> => {

        try {
            return [undefined, f(...x)];
        } catch (e) {
            return [e, undefined];
        }
    }
}


export function getSuccess<T>(x: Fallible<T>) {

    if (!isEither(x) && !isMaybe(x)) throw 'illegal argument - neither Maybe nor Either';
    if (!isSuccess(x)) throw 'illegal argument - expected success value to be present';
    return isEither(x)
        ? (x as any)[1]
        : (x as any)[0];
}
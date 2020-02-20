import {identity} from './core';
import {Either, Pair, Predicate} from './type';

const composition = <T = any>(t: any, ...transformations: Array<Function>) =>
    compose(...transformations)(t) as T;


export const flow = composition;


export const compose = (...transformations: Array<Function>) => (t: any)  =>
    transformations.reduce((acc, transformation) => transformation(acc), t) as any;


type Mapping<A, B> = (_: A) => B;

export function cond<A, B, C>(
    p: boolean|Predicate<A>,
    f: Mapping<A, B>|B,
    g: Mapping<A, C>|C
        = identity as (_: A) => C)
    : (v: A) => B|C {

    return (v: A) => {

        return (typeof p === 'function' ? p(v) : p)
            ? typeof f === 'function' ? (f as Mapping<A,B>)(v) : f
            : typeof g === 'function' ? (g as Mapping<A,C>)(v) : g
    }
}


export const nop = () => {};


export const val = <A>(v: A) => () => v;


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
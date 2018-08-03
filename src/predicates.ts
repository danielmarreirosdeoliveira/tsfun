import {flip} from './core';
import {getElForPathIn} from "./objects/objects";


/**
 * @author Daniel de Oliveira
 */


export type ComparisonFunction = <A>(_: A) => (_: A) => boolean;


export const sameAs: ComparisonFunction = <A>(l:A) =>
    (r:A) => l === r;


export const sameOn = (path: string) =>
    (l: any) => (r: any) => sameAs(getElForPathIn(l, path))(getElForPathIn(r, path));


export const equalOn = (path: string) =>
    (l: any) => (r: any) => equalTo(getElForPathIn(l, path))(getElForPathIn(r, path));


export const equalTo: ComparisonFunction = <A>(l:A) =>
    (r:A) => sameAs(JSON.stringify(l))(JSON.stringify(r));


export const smallerThan: ComparisonFunction = <A>(l:A) =>
    (r:A) => l > r;


export const biggerThan: ComparisonFunction = <A>(l:A) =>
    (r:A) => l < r;


export const includedIn =  <A>(as: Array<A>, compare: ComparisonFunction = sameAs) =>
    (a: A): boolean => includes(as, a, compare).length > 0;


export const differentFrom = <A>(a:A, compare: ComparisonFunction = sameAs) =>
    isNot(compare(a)); // TODO unit test compare


export const isNot = <A>(f: (_: A) => boolean) =>
    (a: A) => flip(f(a));


export const even = () => (n: number) => n % 2 === 0;


export const odd = () => (n: number) => isNot(even())(n);


const includes = <A>(as: Array<A>, a: A, compare: ComparisonFunction) =>
    as.filter(compare(a));

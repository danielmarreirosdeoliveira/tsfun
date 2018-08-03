import {getElForPathIn} from "./objects/objects";
import {isNot} from './predicates';


/**
 * @author Daniel de Oliveira
 */


export type Comparator = <A>(_: A) => (_: A) => boolean;


export const sameAs: Comparator = <A>(l:A) =>
    (r:A) => l === r;


export const equalTo: Comparator = <A>(l:A) =>
    (r:A) => sameAs(JSON.stringify(l))(JSON.stringify(r));


export const smallerThan: Comparator = <A>(l:A) =>
    (r: A) => l > r;

export const biggerThan: Comparator = <A>(l:A) =>
    (r: A) => l < r;


// TODO take care for cases where undefined === undefined
export const onBy = (compare: Function = sameAs) => (path: string, secondPath?: string) =>
    (l: any) => (r: any) =>
        path.length === 0
            ? undefined
            : compare(
                path.charAt(path.length - 1) === ':'
                ? l : getElForPathIn(l, secondPath ? secondPath : path))
            (getElForPathIn(r, path.charAt(path.length - 1) === ':' ? path.slice(0, -1) : path));


export const on = onBy();


export const includedInBy = (compare: Comparator = sameAs) => <A>(as: Array<A>, ) =>
    (a: A): boolean => includesBy(compare)(as, a).length > 0;


export const includedIn =  includedInBy();


export const differentFromBy = (compare: Comparator = sameAs) => <A>(a:A) =>
    isNot(compare(a)); // TODO unit test compare


export const differentFrom = differentFromBy();


const includesBy =
    (compare: Comparator = sameAs) =>
        <A>(as: Array<A>, a: A) => // TODO make curried, add includes function, export
            as.filter(compare(a));
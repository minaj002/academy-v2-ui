/**
 * Created by artis on 20/06/2017.
 */

export const required = value => (value === null ? 'Required' : undefined);
export const email = value => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Not a valid email address' : undefined);


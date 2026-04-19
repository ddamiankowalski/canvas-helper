export type User = {
  name: string;
};

export function createUser(name: string): User {
  return { name };
}

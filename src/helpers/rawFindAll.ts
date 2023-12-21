interface EntityWithGet {
  get(options?: any): any;
}
export const rawFindAll = <T extends EntityWithGet>(array: T[]) => {
  try {
    return array?.map((e) => e?.get({ plain: true }));
  } catch {
    console.log('err rawFindAll');
  }
  return array;
};

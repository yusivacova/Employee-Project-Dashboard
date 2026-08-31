// const monthlyData = { "2026-0": { employees: [], projects: [], total: '$0.00' } };
export const MONTHLY_DATA = {};

export const defineDateKey = () => {
  const periodMonth = document.querySelector('.list-month').value;
  const periodYear = document.querySelector('.list-year').value;
  const keyObjData = `${periodYear}-${periodMonth}`;

  return keyObjData;
};

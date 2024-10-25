import { sleep } from "../../services/utils";
import uoDb from "./uo-db.json";

// Simulate API calls
export const getUos = async () => {
  await sleep(1000);

  const uos = uoDb;

  return {
    uos,
  };
};

export const addUo = async (uo: Omit<(typeof uoDb)[number], "id">) => {
  await sleep(1000);

  const newUo = {
    ...uo,
    id: uoDb.length + 1,
  };

  uoDb.push(newUo);

  return {
    ...newUo,
  };
};

export const updateUo = async (uo: (typeof uoDb)[number]) => {
  await sleep(1000);

  const index = uoDb.findIndex((p) => p.id === project.id);
  uoDb[index] = uo;

  return uo;
};

export const removeUo = async (uo: (typeof uoDb)[number]) => {
  await sleep(1000);

  const index = uoDb.findIndex((p) => p.id === project.id);
  uoDb.splice(index, 1);

  return uo;
};

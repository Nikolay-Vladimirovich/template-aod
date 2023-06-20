import { deleteAsync } from "del";
export const resetAll = () => { return deleteAsync(app.path.buildFolder); }
import { compat, types as T } from "../deps.ts";

// Define a custom type for T.Config to include the 'lightning' property with a 'type' property
interface CustomConfig extends T.Config {
  lightning?: {
    type?: string;
  };
}
// deno-lint-ignore require-await
export const setConfig: T.ExpectedExports.setConfig = async (
  effects: T.Effects,
  newConfig: CustomConfig
) => {
  // add two const depsElectrs and depsFulcrum for the new Electrum type string in getConfig
  const depsElectrs: { [key: string]: string[] } = newConfig?.electrum?.type === "electrs"  ? {electrs: []} : {};
  const depsFulcrum: { [key: string]: string[] } = newConfig?.electrum?.type === "fulcrum"  ? {fulcrum: []} : {};

  // add two const depsLnd and depsCln for the new lightning type string in getConfig
  const depsLnd: { [key: string]: string[] } = newConfig?.lightning?.type === "lnd"  ? {lnd: []} : {};
  const depsCln: { [key: string]: string[] } = newConfig?.lightning?.type === "cln"  ? {"c-lightning": []} : {};
    
  return compat.setConfig(effects, newConfig, {
    ...depsElectrs,
    ...depsFulcrum,
    ...depsLnd,
    ...depsCln,
  });
};

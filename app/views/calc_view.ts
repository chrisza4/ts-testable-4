export type CalcResult = {
  result: number;
}

export function calcResultView(result: number): CalcResult {
  return {
    result
  }
}

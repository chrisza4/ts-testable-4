type CalcSuccessResult = {
  success: true;
  result: number;
}

type ErrorResult = {
  success: false;
  errorMessage: string;
}

export type CalcResult = ErrorResult | CalcSuccessResult

export function calcResultView(result: number): CalcResult {
  return {
    success: true,
    result
  }
}

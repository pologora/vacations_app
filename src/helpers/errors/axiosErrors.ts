export interface MyError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const getAxiosErrorMessage = (error: MyError, message?: string) => {
  let errorMessage = message || '"Coś poszło nie tak. Przepraszamy za niedogodności.';
  if (error?.response?.data?.message) {
    errorMessage = error.response.data.message;
  }
  return errorMessage;
};

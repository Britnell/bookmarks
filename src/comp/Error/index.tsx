import React, { ReactNode } from "react";
import { useRouteError } from "react-router-dom";

export default function Error({ children }: { children: ReactNode }) {
  const error = useRouteError();
  console.log(" ERROR ", error);

  return (
    <div>
      Error
      <div>{JSON.stringify(error)}</div>
      {children}
    </div>
  );
}

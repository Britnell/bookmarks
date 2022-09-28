import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(" ERROR ", error);

  return (
    <div>
      Error
      <div>{JSON.stringify(error)}</div>
    </div>
  );
}

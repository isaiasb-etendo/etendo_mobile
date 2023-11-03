import React, { useMemo, Suspense } from "react";
import { fetchComponent } from "../utils";
import LoadingScreen from "./LoadingScreen";

const DynamicComponent = ({ __id, children, ...props }: any) => {
  const Component = useMemo(() => {
    const component = async () => {
      const componentPromise = fetchComponent(
        __id,
        props.isDev ? `${props.url}:3000` : props.url,
        props.navigationContainer
      );
      componentPromise.catch((e) => {
        console.error(e);
      });
      componentPromise.finally(() => {
        console.info("fetch done !!!");
      });
      return componentPromise;
    };
    return React.lazy(component);
  }, [__id]);
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props}>{children}</Component>
    </Suspense>
  );
};

export default DynamicComponent;

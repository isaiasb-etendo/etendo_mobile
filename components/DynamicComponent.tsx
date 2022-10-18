import React, { useMemo, Suspense } from 'react';
import { Text, View } from 'react-native';
import { fetchComponent } from "./utils";

const DynamicComponent = ({ __id, url, children, ...props }: any) => {
    const Component = useMemo(() => {
        return React.lazy(async () => fetchComponent(__id, url))
    }, [__id]);

    return (
        <Suspense fallback={<View><Text>Loading...</Text></View>}>
            <Component {...props}>{children}</Component>
        </Suspense>
    )
};

export default React.memo(DynamicComponent);
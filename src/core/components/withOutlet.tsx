import { Outlet } from "react-router-dom";

interface IWithOutletProps {
    after?: boolean;
}
interface IWithOutletChildrenProps extends IWithOutletProps {
    children: React.ReactElement;
}
interface IWithOutletElementProps extends IWithOutletProps {
    element: React.ReactElement;
}
type WithOutletProps = IWithOutletChildrenProps | IWithOutletElementProps;

export function WithOutlet(props: WithOutletProps) {
    const el = 'children' in props
        ? props.children
        : props.element;
    const after = !!props?.after;
    
    return <>
        {!after && <Outlet />}
        {el}
        {!!after && <Outlet />}
    </>
}

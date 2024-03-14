export default interface IFormGrid {
    validationUtils?: {isValid?: boolean, setTouch?: Function, updateValidValue?: Function};
    customAction?: Function;
    actionButton?
    : string;
    style?: Object;
    model?: {post: Function};
    record?: Object;
    children: React.ReactNode;
    title?: string,
}
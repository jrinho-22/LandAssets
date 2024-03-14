import { useEffect, useState } from "react";

export const required = (v: any) => {
  return v == null || v.length == 0 || v == 0 ? false : true;
};

export const validEmail = (v: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(v);
};

export const requiredIf = (requiredV: any, v: any) => {
  if (!requiredV) {
    return true;
  }
  return required(v);
};

const useValidation = (record: any, v: any) => {
  const [touch, setTouch] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [formUntouched, setFormUntouched] = useState({});
  const [allValues, setAllValues] = useState<boolean[]>([]);

  const resetForm = () => {
    setIsValid(true);
    setTouch(false);
  };

  useEffect(() => {
    const getFormUntouched = (v: any, parent?: any) => {
      for (const key in v) {
        if (v[key].constructor.name !== "Object") {
          v[key].constructor.name !== "Array"
            ? setAllValues((prev: any) => [...prev, v[key]])
            : setAllValues((prev: any) => [...prev, v[key][0] && v[key][1]]);
        }
        if (v[key].constructor.name == "Object") {
          setFormUntouched((prev) => ({ ...prev, [key]: v[key] }));
          getFormUntouched(v[key], key);
        } else if (parent) {
          setFormUntouched((prev: any) => ({
            ...prev,
            [parent]: { ...prev[parent], [key]: true }
          }));
        } else {
          setFormUntouched((prev: any) => ({
            ...prev,
            [key]: true
          }));
        }
      }
    };
    setAllValues([]);
    getFormUntouched(v);
    // setIsValid(false);
  }, [record, touch]);

  useEffect(() => {
    console.log(v, "vvvv");
  }, [v]);

  useEffect(() => {
    touch == true && updateValidValue();
  }, [allValues]);

  const updateValidValue = () => {
    if (allValues.some((v) => v == false)) {
      setIsValid(false);
    } else if (allValues.every((v) => v == true)) {
      setIsValid(true);
    }
  };

  return {
    validationUtils: { updateValidValue, setTouch, isValid, resetForm },
    validationForm: !touch ? formUntouched : v
  };
};

export default useValidation;

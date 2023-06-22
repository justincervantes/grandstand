import { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useFormikContext } from 'formik';

const FailedSubmissionToast = () => {
    const { addToast } = useToast();
    const { errors, isSubmitting } = useFormikContext();
    useEffect(() => {
        if (Object.keys(errors).length && isSubmitting) {
            addToast(`Failed to submit - ${Object.keys(errors).length} errors on form`, 'Error');
        }
    }, [isSubmitting]);
    return null;
};

export default FailedSubmissionToast;

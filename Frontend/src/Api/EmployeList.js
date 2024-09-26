
import { QueryClient, QueryClientProvider,useQuery,useMutation } from '@tanstack/react-query';


export async function employeeList() {
    try {
        const token = localStorage.getItem('auth-token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
        const response = await axios.get('http://localhost:5000/api/employees/all', config);
        return response.data;
    } catch (error) {
        if (error.response) {
        throw error.response.data;
        } else if (error.request) {
        throw new Error('No response received from server');
        } else {
        throw new Error('Error setting up request: ' + error.message);
        }
    }
    }
export const RQ_employeeList = () =>
    useQuery({
    queryKey: ['employeeList'],
    queryFn: employeeList
    });
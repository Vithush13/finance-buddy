import toast from "react-hot-toast";
import DashboardLayout from "../components/layouts/dashboardLayout";
import useUserAuth from "../hooks/useUserAuth";
import { API_PATHS } from "../utils/apiPath";
import axiosInstance from "../utils/axios";
import ExpenseOverview from "../components/expense/expenseOverview";
import { useState, useEffect } from "react";
import Modal from "../components/layouts/modal";
import AddExpenseForm from "../components/expense/expenseForm";
import ExpenseList from "../components/expense/expenseList";
import DeleteAlert from "../components/layouts/deleteAlert";

export default function Expenses() {
  useUserAuth();
  
    const [openAddExpense,setOpenAddExpense] = useState(false);
    const [expensedata,setExpenseData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [aiInsights, setAiInsights] = useState("");
    const [openDeleteAlert,setOpenDeleteAlert] = useState({
      show:false,
      data:null,
    });
  

    const fetchExpenseDetails = async ()=>{
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data){
        setExpenseData(response.data);
      }
    }catch(error){
      console.error("Something went wrong", error);
    } finally{
      setLoading(false);
    }
  };

 const fetchAIInsights = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.AI_INSIGHTS);
      setAiInsights(response.data.insights); // Show insights in UI
    } catch (error) {
      console.error("Error fetching AI insights:", error.response?.data || error.message);
      toast.error("Failed to fetch AI insights");
    }
  };

  const handleAddExpense = async (expense)=>{
    const {category, amount,date, icon} = expense;

    if(!category.trim()){
      toast.error("Category is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0){
      toast.error("Amount should be a valid number");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category ,amount ,date ,icon
      });

      setOpenAddExpense(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
      fetchAIInsights();
    }catch(error){
      console.log("Error adding expense", error.response?.data?.message ||error.message);
    }
  };

    const deleteExpense = async (id)=>{
     try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

       setOpenDeleteAlert({show:false, data:null});
       toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log("Error deleting expense", error.response?.message || error.message);
      
    }
  };
  
  const handleDownloadExpense = async ()=>{
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
              {
                responseType:"blob",
              }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href= url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.log("Error downloading expenses",error);
      toast.error("Failed to download expense details");
    }
  };


   useEffect(()=>{
      fetchExpenseDetails();
       fetchAIInsights();
      return ()=> {};
    },[])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview  transactions={expensedata}
                  onExpenseIncome ={()=> setOpenAddExpense(true)} />
          </div>
          <ExpenseList transactions ={expensedata}
                         onDelete ={(id)=> {
                          setOpenDeleteAlert({show:true, data:id});}}
                          onDownload={handleDownloadExpense}/>
        </div>
        <Modal isOpen={openAddExpense} onClose={()=> setOpenAddExpense(false)} title="Add Expense">
                  <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal isOpen={openDeleteAlert.show} 
                      onClose={()=> setOpenDeleteAlert({show:false ,data:null})} title="Delete Expense">
                     <DeleteAlert  content="Are you sure Delete expense details?"  onDelete={()=>deleteExpense(openDeleteAlert.data)}/>
                </Modal>

         <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
  <h2 className="text-lg font-semibold">💡 AI Expense Insights</h2>
  <p className="mt-2 whitespace-pre-line">{aiInsights || "Loading AI insights..."}</p>
</div>
 
      </div>
     
    </DashboardLayout>
  );
}

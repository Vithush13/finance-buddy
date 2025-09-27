
import { useEffect, useState } from "react";
import DashboardLayout from "../components/layouts/dashboardLayout";
import IncomeOverview from "../components/income/incomeOverview";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPath";
import Modal from "../components/layouts/modal";
import AddIncomeForm from "../components/income/incomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../components/income/incomeList";
import DeleteAlert from "../components/layouts/deleteAlert";
import useUserAuth from "../hooks/useUserAuth";

export default function Income() {
  useUserAuth();

  const [openAddIncome,setOpenAddIncome] = useState(false);
  const [incomedata,setIncomeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });
  
  const fetchIncomeDetails = async ()=>{
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if(response.data){
        setIncomeData(response.data);
      }
    }catch(error){
      console("Something went wrong", error);
    } finally{
      setLoading(false);
    }
  };

  const handleAddIncome = async (income)=>{
    const {source, amount,date, icon} = income;

    if(!source.trim()){
      toast.error("Source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source ,amount ,date ,icon
      });

      setOpenAddIncome(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    }catch(error){
      console.log("Error adding income", error.response?.data?.message ||error.message);
    }
  };
  
  const deleteIncome = async (id)=>{
     try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

       setOpenDeleteAlert({show:false, data:null});
       toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Error deleting income", error.response?.message || error.message);
      
    }
  };
  
  const handleDownloadIncome = async ()=>{
     try{
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,
              {
                responseType:"blob",
              }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href= url;
      link.setAttribute("download","income_details.xlsx");
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
    fetchIncomeDetails();

    return ()=> {};
  },[])
  
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview transactions ={incomedata}
               onAddIncome ={()=> setOpenAddIncome(true)}/>

             <IncomeList transactions ={incomedata}
               onDelete ={(id)=> {
                setOpenDeleteAlert({show:true, data:id});}}
                OnDownload={handleDownloadIncome}/>
          </div>
        </div>

        <Modal isOpen={openAddIncome} onClose={()=> setOpenAddIncome(false)} title="Add Income">
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

          <Modal isOpen={openDeleteAlert.show} 
              onClose={()=> setOpenDeleteAlert({show:false ,data:null})} title="Delete Income">
             <DeleteAlert  content="Are you sure Delete income details?"  onDelete={()=>deleteIncome(openDeleteAlert.data)}/>
        </Modal>
      </div>
     
    </DashboardLayout>
  );
}

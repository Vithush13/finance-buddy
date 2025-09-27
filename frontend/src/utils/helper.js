import moment from "moment";


export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function getInitials(name){
  if(!name) return"";

  const words= name.split(" ");
  let initials="";

  for (let i=0 ;i<Math.min(words.length,2); i++){
    initials+=words[i][0]
  }

  return initials.toUpperCase();

};

export  function addThousandsSeparator(num){
     if(num==null || isNaN(num))
      return "";

     const [integerPart, fractionalPart] = num.toString().split(".");
     const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

     return fractionalPart ? `${formattedInteger}.${fractionalPart}`: formattedInteger;
};

export function prepareExpenseBarChartData(data=[]){
  const chartData = data.map((item)=> ({
    month: moment(item?.date).format("Do MMM"),
    category: item?.category,
    amount: item?.amount,
     label: `${item?.category}`,
  }))
   return chartData;
}

export function prepareincomeBarChartData(data=[]){
  const chartData = data.map((item)=> ({
     month: moment(item?.date).format("Do MMM"),
    source: item?.source,
    amount: item?.amount,
    label: `${item?.source}`,
  }))
   return chartData;
}


export function prepareincomeBarChartallData(data = []) {
  
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"), // x-axis label
    amount: item?.amount,                       // y-axis value
    source: item?.source,
    label: `${moment(item?.date).format("Do MMM")}`,                       // optional
  }));

  return chartData;
}

export function prepareExpenseLineChart(data = []) {
  
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"), // x-axis label
    amount: item?.amount,                       // y-axis value
    category: item?.category,
    label: `${moment(item?.date).format("Do MMM")} - ${item?.category || item?.source}`,                       // optional
  }));

  return chartData;
}
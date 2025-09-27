import {XAxis,YAxis,Cell,Tooltip,Pie,Legend,ResponsiveContainer,CartesianGrid,Area,AreaChart} from "recharts";

export default function CustomBaLineChart({data}){
    const CustomTooltip = ({active,payload}) =>{
        if(active && payload && payload.length){
    
    return(
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
            <p className="text-xs font-semibold text-blue-800 mb-1">{payload[0].payload.category}</p>
            <p className="text-sm text-gray-600">
                Amount:<span className="font-medium text-sm text-gray-900">Rs.{payload[0].payload.amount}</span></p>
        </div>
    );
    }
    return null;
};
   return(
    <div className="bg-white">
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
            <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="2">
                    <stop offset="5%" stopColor="#4d61f8ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4d61f8ff" stopOpacity={0} />
                </linearGradient>
                </defs>
                <CartesianGrid stroke="none"/>
                <XAxis dataKey="month" tick={{fontSize:12, fill:"#555"}} stroke="none" />
                <YAxis  tick={{fontSize:12, fill:"#555"}} stroke="none" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#4d61f8ff" fill="url(#incomeGradient)" strokeWidth={3} dot={{r:3, fill:"#8dc3f8ff"}} />
                </AreaChart>
        </ResponsiveContainer>
    </div>
   )
};

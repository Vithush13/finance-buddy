import {PieChart,Cell,Tooltip,Pie,Legend,ResponsiveContainer} from "recharts";

export default function CustomPieChart({data,label,totalAmount,colors,showTextAnchor}){

    return(
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={data} dataKey="amount" nameKey="name" cx="50%" cy="50%"
                     outerRadius={130} innerRadius={100} labelLine={false} > 
                     {data.map((entry,index) =>(
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                    ))}

                </Pie>
                <Tooltip/>
                <Legend 
                   layout="horizontal"       // horizontal legend
                    verticalAlign="bottom"    // place at bottom
                    align="center"            // center horizontally
                 wrapperStyle={{ fontSize: "14px" }} />

                {showTextAnchor && (
                    <>
                    <text x="50%" y="50%" dy={-25} textAnchor="middle" fill="#666" fontSize="14px">
                        {label}
                    </text>
                     <text x="50%" y="50%" dy={8} textAnchor="middle" fill="#333" fontSize="24px" fontWeight="semi-bold">
                        {totalAmount}
                    </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
        
    )
    
}
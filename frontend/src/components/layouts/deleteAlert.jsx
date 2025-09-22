
export default function DeleteAlert({content,onDelete}){
    return(
        <div>
            <p className="text-sm">{content}</p>

            <div className="flex justify-end mt-6">
                <button type="button"
                      className="flex items-center gap-3 text-[12px] font-medium  text-white  bg-blue-500  hover:bg-blue-700 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200 "
                      onClick={onDelete}>
                        Delete
                      </button>
            </div>
        </div>
    )
}
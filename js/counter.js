const COUNTER_API =
"https://api.countapi.xyz/hit/Badbakhti_Tools/";



export async function useCounter(toolId){

    try{


        let response =
            await fetch(
                COUNTER_API + toolId
            );


        let data =
            await response.json();



        return data.value || 0;



    }
    catch(error){

        console.log(
            "Counter error:",
            error
        );


        return null;

    }

}

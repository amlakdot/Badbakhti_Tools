const COUNTER_API =
"https://api.countapi.xyz/hit/Badbakhti_Tools/";


export async function useCounter(toolId){

    try{

        const response =
            await fetch(
                COUNTER_API + toolId
            );


        const data =
            await response.json();


        return data.value || 0;


    }
    catch(error){

        console.log(
            "Counter Error:",
            error
        );


        return 0;

    }

}

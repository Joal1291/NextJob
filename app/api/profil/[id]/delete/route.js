//gestion cookies
import { cookies } from "next/headers";
//gestion json 
import { NextResponse } from "next/server";
//gestion route     
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function DELETE(_, {params}){
    const id = params.id
    const supabase = createRouteHandlerClient({cookies})

    const { error } = await supabase.from('candidate')
        .delete()
        .eq('id', id)
    
}
// gestion des cookies
import { cookies } from "next/headers";
//gestion des json  
import { NextResponse } from "next/server";
// creation de la route
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request){
    const job = await request.json()
    const supabase = createRouteHandlerClient({cookies})

    // const {data : {session}} = supabase.getSession()
    
    const {data, error} = await supabase.from('Job')
        .insert({
            ...job,
            // EmployerId: session.user.id,
        })
        .select()
        .single()
    
    return NextResponse.json({data, error})
}
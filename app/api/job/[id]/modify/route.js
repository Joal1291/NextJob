//gestion cookies
import { cookies } from "next/headers";
//gestion json
import { NextResponse } from "next/server";
//gestion route
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function PUT(request, {params}){
    const newJob = request.json()
    const id = params.id

    const supabase = createRouteHandlerClient({cookies})

    const {data : {session}} = supabase.getSession()
    
    const {data, error} = await supabase.from('job')
        .eq('id', id)
        .update({
            ...newJob
        })
        .single()
    
}
//gestion cookies
import { cookies } from "next/headers";
//gestion json
import { NextResponse } from "next/server";
//gestion route
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import next from "next";

export async function PUT(request, {params}){
    const password = request.json()
    const id = params.id
    const supabase = createRouteHandlerClient({cookies})

    const {error} = await supabase.from('candidate')
        .eq('id', id)
        .update({
            ...password
        })
        .single()

    return NextResponse.json({error})
        
}
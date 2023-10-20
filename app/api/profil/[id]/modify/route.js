//gestion cookies
import { cookies } from "next/headers";
//gestion json
import { NextResponse } from "next/server";
//gestion route
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function PUT(request, {params}){
    const profil = await request.json()
    const id = params.id

    const supabase = createRouteHandlerClient({cookies})
    
    const { data, error } = await supabase.from('Profile')
        .update({ 'FirstName': profil.FirstName, 'LastName': profil.LastName, 'Tel': profil.Tel })
        .eq('Id', id)
        .select()

    console.log(id)
    console.log(data, error)
    return NextResponse.json({data, error})
}
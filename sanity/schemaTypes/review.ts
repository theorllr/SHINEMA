import {defineArrayMember, defineField, defineType} from 'sanity'
export const review=defineType({name:'review',title:'Critique',type:'document',fields:[
 defineField({name:'filmTitle',title:'Film',type:'string',validation:r=>r.required()}),
 defineField({name:'articleTitle',title:'Titre de la critique',type:'string',validation:r=>r.required()}),
 defineField({name:'slug',title:'Adresse de la page',type:'slug',options:{source:'articleTitle',maxLength:96},validation:r=>r.required()}),
 defineField({name:'director',title:'Réalisateur·rice',type:'string',validation:r=>r.required()}),
 defineField({name:'year',title:'Année du film',type:'number',validation:r=>r.required().min(1888).max(2100)}),
 defineField({name:'rating',title:'Note /10',type:'number',validation:r=>r.required().min(0).max(10).precision(1)}),
 defineField({name:'publishedAt',title:'Date de publication',type:'date',initialValue:()=>new Date().toISOString().slice(0,10),validation:r=>r.required()}),
 defineField({name:'excerpt',title:'Résumé court',type:'text',rows:3,validation:r=>r.required().max(240)}),
 defineField({name:'mainImage',title:'Image principale',type:'image',options:{hotspot:true},fields:[defineField({name:'alt',title:'Texte alternatif',type:'string'})]}),
 defineField({name:'body',title:'Critique',type:'array',of:[defineArrayMember({type:'block'})],validation:r=>r.required()}),
],preview:{select:{title:'filmTitle',subtitle:'articleTitle',media:'mainImage'}}})

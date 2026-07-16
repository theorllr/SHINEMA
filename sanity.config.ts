'use client'
import {defineConfig} from 'sanity'; import {structureTool} from 'sanity/structure'; import {visionTool} from '@sanity/vision'; import {schemaTypes} from './sanity/schemaTypes'; import {projectId,dataset} from './lib/sanity'
export default defineConfig({name:'default',title:'SHINEMA',projectId,dataset,basePath:'/studio',plugins:[structureTool(),visionTool()],schema:{types:schemaTypes}})

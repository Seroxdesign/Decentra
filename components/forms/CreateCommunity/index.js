import React, {useState} from 'react';
import ImageUploader from '@components/layout/ImageUploader';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss'

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input type="text" placeholder="name" {...register("name", {required: true, min: 3, maxLength: 100})} />
      <input type="text" placeholder="id" {...register("id", {})} />
      <input type="text" placeholder="description" {...register("description", {min: 10, maxLength: 500})} />
      <input type="checkbox" placeholder="public" {...register("public", {min: 10, maxLength: 500})} />
      <label for="public">Public Group</label>
     <input type="submit" />
    </form>
  );
}
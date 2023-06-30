import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { useContext } from 'react';


const listingFormSchema = z.object({
  album: z.string({required_error: "Name is required",
    invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
  description: z.string({required_error: "Description is required",
    invalid_type_error: "Description must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
  weight: z.preprocess((val) => Number(val), z.number({required_error: "Weight is required",
    invalid_type_error: "Weight must be a number",
    })
    .positive()),
  price: z.preprocess((val) => Number(val), z.optional(z.number({invalid_type_error: "Price must be a number",})
    .nonnegative()))
})

type ItemFormProps = {
  setter?: React.Dispatch<React.SetStateAction<Item[]>>
  packId?: number
  categoryId: number
  setPackItems?: React.Dispatch<React.SetStateAction<Item[]>>
}

export function ItemForm ({packId, categoryId, setPackItems}: ItemFormProps) {

  console.log(setPackItems)

  const userId = useContext(userContext)

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: '',
      description: '',
      weight: 0,
      cost: 0
    }
  })

  function onSubmit(item: z.infer<typeof itemFormSchema>) {
    const addItem = async (item: z.infer<typeof itemFormSchema>) => {
      const newItem = {...item, categoryId: categoryId }
      const addedItem = await apiService.addItem(newItem, userId);
      if (packId) {
        const connection = await apiService.connectItemToPack(addedItem.id, packId)
        console.log(connection)
      }
      if (setPackItems && packId) {
        const items = await apiService.getPackItems(packId);
        setPackItems(items[0].packItems)
      }
    }
    addItem(item);    
    form.reset();
  }

  return (
    <Form {...form}>
        <form className='flex flex-col items-center space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
          <div className=' flex justify-start space-x-2'>
            <FormField
            control={form.control}
            name= 'name'
            render = {({ field }) => (
              <FormItem className='flex flex-col items-center'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className='' placeholder='e.g Tent' {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name= 'description'
            render = {({ field }) => (
              <FormItem className='flex flex-col items-center'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input className='w-max' placeholder='e.g Zpacks Duplex' {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name= 'weight'
            render = {({ field }) => (
              <FormItem className='flex flex-col items-center'>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input className='w-max' placeholder='In Kg'  type='number' {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name= 'cost'
            render = {({ field }) => (
              <FormItem className='flex flex-col items-center'>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input className='w-max' placeholder='Optional..' type='number' {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          </div>
          <Button type='submit'>Add</Button>
        </form>
    </Form>
  )
}
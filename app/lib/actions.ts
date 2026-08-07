'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/app/lib/prisma';

// Schema for validating form data (for create and update)
const FormSchema = z.object({
  id: z.string().optional(), // id is optional for create
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce
    .number()
    .gt(0, 'Price must be greater than 0'),
});

export async function createProduct(prevState: any, formData: FormData) {
  // Validate form data
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    price: formData.get('price'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the form.',
    };
  }

  const { name, category, price } = validatedFields.data;
  
  // Get the image file from the form
  const imageFile = formData.get('image') as File;
  let imageUrl = '';
  
  if (imageFile && imageFile.size > 0) {
    // Convert image to base64 string
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    imageUrl = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
  }

  try {
    // Insert the new product into the database with image
    await prisma.products.create({
      data: { nama_produk: name, kategori: category, harga: price, gambar: imageUrl },
    });

    // Revalidate the products page to reflect the new product
    revalidatePath('/dashboard/products');

    // Redirect to the products page
    redirect('/dashboard/products');
  } catch (error) {
    console.error('Failed to create product:', error);
    return { message: 'Failed to create product.', errors: {} };
  }
}

export async function updateProduct(id: string, prevState: any, formData: FormData) {
  // Validate form data
  const validatedFields = FormSchema.safeParse({
    id,
    name: formData.get('name'),
    category: formData.get('category'),
    price: formData.get('price'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the form.',
    };
  }

  const { name, category, price } = validatedFields.data;
  
  // Get the image file from the form
  const imageFile = formData.get('image') as File;
  
  try {
    // Process image if a new one was uploaded
    if (imageFile && imageFile.size > 0) {
      // Convert image to base64 string
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const imageUrl = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
      
      // Update product with new image
      await prisma.products.update({
        where: { id_produk: id },
        data: { nama_produk: name, kategori: category, harga: price, gambar: imageUrl },
      });
    } else {
      // Update product without changing the image
      await prisma.products.update({
        where: { id_produk: id },
        data: { nama_produk: name, kategori: category, harga: price },
      });
    }

    revalidatePath('/dashboard/products');
    return { message: 'Product updated successfully', errors: {} };
  } catch (error) {
    console.error('Failed to update product:', error);
    return { message: 'Failed to update product.', errors: {} };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.products.delete({ where: { id_produk: id } });
    revalidatePath('/dashboard/products');
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw new Error('Failed to delete product.');
  }
}

const TransactionSchema = z.object({
  productId: z.string().optional(), // nullable
  buyerName: z.string().min(1, 'Buyer name is required'),
  totalPrice: z.coerce.number().gt(0, 'Total price must be greater than 0'),
  date: z.string().datetime({ message: 'Invalid date format (ISO expected)' }), // ISO timestamp
  userId: z.string().optional(), // optional
});

export async function createTransaction(prevState: any, formData: FormData) {
  const validated = TransactionSchema.safeParse({
    productId: formData.get('productId')?.toString() || undefined,
    buyerName: formData.get('buyerName'),
    totalPrice: formData.get('totalPrice'),
    date: formData.get('date'),
    userId: formData.get('userId')?.toString() || undefined,
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the form.',
    };
  }

  const { productId, buyerName, totalPrice, date, userId } = validated.data;

  try {
    await prisma.transactions.create({
      data: {
        id_produk: productId ?? null,
        nama_pembeli: buyerName,
        total_harga: totalPrice,
        tanggal: new Date(date),
        id_user: userId ?? null,
      },
    });

    revalidatePath('/dashboard/transactions');
    redirect('/dashboard/transactions');
  } catch (error) {
    console.error('Failed to create transaction:', error);
    return { message: 'Failed to create transaction.', errors: {} };
  }
}

export async function createUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.users.create({
      data: { name: username, email, password: hashedPassword, role: 'user' },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating user:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to create user: ${errorMessage}`);
  }

  // Pindahkan redirect di luar try-catch
  redirect("/");
}

export async function deleteTransaction(id: string) {
  "use server";
  try {
    await prisma.transactions.delete({ where: { id_transaksi: id } });
    revalidatePath("/dashboard/report");
    redirect("/dashboard/report"); // Redirect hanya jika sukses
  } catch (error) {
    console.error("Failed to delete transaction:", error);
    throw new Error("Failed to delete transaction: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}

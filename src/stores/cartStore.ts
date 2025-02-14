import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    currency: string;
    images: string[];
    slug: string;
  };
}

interface CartStore {
  items: CartItem[];
  loading: boolean;
  addItem: (productId: string, product: CartItem['product']) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: () => Promise<void>;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      total: 0,

      addItem: async (productId, product) => {
        set({ loading: true });
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const existingItem = get().items.find(item => item.product_id === productId);
          
          if (existingItem) {
            await supabase
              .from('cart_items')
              .update({ quantity: existingItem.quantity + 1 })
              .eq('product_id', productId)
              .eq('user_id', user.id);
            
            set(state => ({
              items: state.items.map(item =>
                item.product_id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              total: state.total + product.price
            }));
          } else {
            const { data } = await supabase
              .from('cart_items')
              .insert({
                user_id: user.id,
                product_id: productId,
                quantity: 1
              })
              .select('id')
              .single();

            if (data) {
              set(state => ({
                items: [...state.items, {
                  id: data.id,
                  product_id: productId,
                  quantity: 1,
                  product
                }],
                total: state.total + product.price
              }));
            }
          }
        } finally {
          set({ loading: false });
        }
      },

      removeItem: async (productId) => {
        set({ loading: true });
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          await supabase
            .from('cart_items')
            .delete()
            .eq('product_id', productId)
            .eq('user_id', user.id);

          const item = get().items.find(item => item.product_id === productId);
          if (item) {
            set(state => ({
              items: state.items.filter(item => item.product_id !== productId),
              total: state.total - (item.product.price * item.quantity)
            }));
          }
        } finally {
          set({ loading: false });
        }
      },

      updateQuantity: async (productId, quantity) => {
        if (quantity < 1) return;
        set({ loading: true });
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('product_id', productId)
            .eq('user_id', user.id);

          const item = get().items.find(item => item.product_id === productId);
          if (item) {
            const priceDiff = (quantity - item.quantity) * item.product.price;
            set(state => ({
              items: state.items.map(item =>
                item.product_id === productId
                  ? { ...item, quantity }
                  : item
              ),
              total: state.total + priceDiff
            }));
          }
        } finally {
          set({ loading: false });
        }
      },

      clearCart: async () => {
        set({ loading: true });
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id);

          set({ items: [], total: 0 });
        } finally {
          set({ loading: false });
        }
      },

      syncCart: async () => {
        set({ loading: true });
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            set({ items: [], total: 0 });
            return;
          }

          const { data: cartItems } = await supabase
            .from('cart_items')
            .select(`
              id,
              product_id,
              quantity,
              products (
                name,
                price,
                currency,
                images,
                slug
              )
            `)
            .eq('user_id', user.id);

          if (cartItems) {
            const items = cartItems.map(item => ({
              id: item.id,
              product_id: item.product_id,
              quantity: item.quantity,
              product: item.products
            }));

            const total = items.reduce((sum, item) => 
              sum + (item.product.price * item.quantity), 0
            );

            set({ items, total });
          }
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
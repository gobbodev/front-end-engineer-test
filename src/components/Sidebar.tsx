'use client';
import React, { useState, useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { Reorder } from 'framer-motion';

import { useCategoriesStore } from '../stores/categories/useCategoriesStore';
import { TigerShotLogoSVG } from '../../public/icons/TigerShotLogoSVG';

import { NavButton } from './ui/NavButton';
import { NavLink } from './ui/NavLink';

// a Sidebar possui itens que mudam de NavLink para NavButton dependendo do pathname
// como era requisito ter uma página de uma odd especifica e eu queria facilitar o render
// do conteudo das categorias da sidebar, eu mesclei essa solução pro teste

export function Sidebar() {
  const { categories, selectedCategory, selectCategory } = useCategoriesStore();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // categorias são estáticas, não precisa buscar

  // se n houver categoria selecionada, seleciona a primeira categoria (quando disponivel)
  useEffect(() => {
    if (!categories.length) return;
    const categoryParam = searchParams.get('category');

    if (categoryParam) {
      selectCategory(categoryParam);
    } else {
      selectCategory(categories[0].slug);
    }
  }, [categories, searchParams, selectCategory]);

  // avoid hydration mismatch: only enable drag after client mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Reorderable categories with drag-and-drop, persisted in localStorage
  const [orderedSlugs, setOrderedSlugs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('categoriesOrder');
      if (stored) {
        try { const arr = JSON.parse(stored); if (Array.isArray(arr)) return arr; } catch {}
      }
    }
    return categories.map(c => c.slug);
  });
  useEffect(() => {
    const slugs = categories.map(c => c.slug);
    setOrderedSlugs(prev => {
      const merged = [...prev.filter(s => slugs.includes(s)), ...slugs.filter(s => !prev.includes(s))];
      if (merged.length !== prev.length) {
        window.localStorage.setItem('categoriesOrder', JSON.stringify(merged));
      }
      return merged;
    });
  }, [categories]);
  const handleReorder = (newOrder: string[]) => {
    setOrderedSlugs(newOrder);
    window.localStorage.setItem('categoriesOrder', JSON.stringify(newOrder));
  };

  return (
    <aside className="relative text-mywhite w-[22%]">
      <div className='fixed h-[calc(100vh+50px)] max-w-64 bg-myblack px-4'>

        {/* Logo */}
        <div className='w-full flex justify-center'>
          <TigerShotLogoSVG className="w-64" />
        </div>

        {/* Banner */}
        <div className="bg-laranja-escuro py-4 text-branco border-t-2 border-myorange-white/10">
          <h2 className="text-lg font-bold mb-2">Encontre aqui só as <span className="text-myorange-low">Melhores Odds</span></h2>
          <p className="text-sm text-mywhite/80">Com as melhores casas de apostas do Brasil para você!</p>
        </div>

        {/* Categorias */}
        <div className="mt-2 py-4">
          <h3 className="text-lg mb-4 font-medium text-laranja-claro">ESPORTES</h3>

          <nav className="space-y-3">
            {!mounted ? (
              // static nav to match server-rendered HTML
              (pathname === '/'
                ? categories.map(category => {
                    const Icon = category.icon;
                    return (
                      <NavButton key={category.id} id={category.slug} onClick={() => selectCategory(category.slug)} className={`transition-colors ${selectedCategory === category.slug ? 'text-myorange-low' : 'hover:text-myorange-white'}`}>
                        <Icon className="w-4 h-4 mr-3" />{category.name}
                      </NavButton>
                    );
                  })
                : categories.map(category => {
                    const Icon = category.icon;
                    return (
                      <NavLink key={category.id} href={`/?category=${category.slug}`} className={`transition-colors ${selectedCategory === category.slug ? 'text-myorange-low' : 'hover:text-myorange-white'}`}>
                        <Icon className="w-4 h-4 mr-3" />{category.name}
                      </NavLink>
                    );
                  }))
            ) : (
              <Reorder.Group axis="y" values={orderedSlugs} onReorder={handleReorder} className="space-y-3">
                {orderedSlugs.map(slug => {
                  const category = categories.find(c => c.slug === slug)!;
                  const Icon = category.icon;
                  return (pathname === '/'
                    ? <Reorder.Item key={slug} value={slug} whileDrag={{ scale: 1.02 }} className="cursor-grab">
                        <NavButton id={category.slug} onClick={() => selectCategory(category.slug)} className={`transition-colors ${selectedCategory === category.slug ? 'text-myorange-low' : 'hover:text-myorange-white'}`}><Icon className="w-4 h-4 mr-3" />{category.name}</NavButton>
                      </Reorder.Item>
                    : <Reorder.Item key={slug} value={slug} whileDrag={{ scale: 1.02 }} className="cursor-grab">
                        <NavLink href={`/?category=${category.slug}`} className={`transition-colors ${selectedCategory === category.slug ? 'text-myorange-low' : 'hover:text-myorange-white'}`}><Icon className="w-4 h-4 mr-3" />{category.name}</NavLink>
                      </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            )}
          </nav>

        </div>
      </div>

    </aside>
  );
}

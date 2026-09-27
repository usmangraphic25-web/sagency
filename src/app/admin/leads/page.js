"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Shield,
  Lock,
  Search,
  RefreshCw,
  Mail,
  Building,
  Calendar,
  Eye,
  X,
  MessageSquare,
  Package,
  KeyRound,
  Download,
  Filter,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  Plus,
  Edit,
  Upload,
  ArrowUpDown,
  Star,
  StarOff,
  ExternalLink,
  Phone,
  User,
  Clock,
  Video,
  FileText,
  BarChart2,
  TrendingUp,
  Globe,
  Code,
  ArrowUp,
  ArrowDown,
  Layers,
  Image as ImageIcon,
  Play,
  Sparkles,
  Crop
} from 'lucide-react';
import { graphicDesignCategories } from '@/lib/graphicDesignData';
import AmazonPpcAdminSection from '@/components/admin/AmazonPpcAdminSection';
import { getMediaGalleryHelperText, getServiceCropDetails } from '@/lib/portfolioUtils';

// Amazon Growth Subcategories
const AMAZON_GROWTH_CATEGORIES = [
  { slug: "amazon-listing-images", name: "Amazon Listing Images" },
  { slug: "a-plus-content", name: "A+ Content" },
  { slug: "amazon-brand-store", name: "Amazon Brand Store" },
  { slug: "amazon-campaigns", name: "Amazon Campaigns" }
];

// Main Portfolio Services List
const PORTFOLIO_SERVICES = [
  "Amazon Growth",
  "Web Development",
  "Graphic Design",
  "SEO",
  "Digital Marketing",
  "Video & Motion Design"
];

// Video Types for Video & Motion Design
const VIDEO_TYPES = [
  "Reel",
  "Shorts",
  "TikTok",
  "Motion Graphics",
  "Product Video",
  "Explainer Video",
  "Advertisement",
  "Amazon Video"
];

export default function AdminLeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Main Dashboard Navigation Section: 'client-requests' | 'portfolio-projects'
  const [activeSection, setActiveSection] = useState('client-requests');

  // =========================================================
  // 1. CLIENT REQUESTS / LEADS STATE
  // =========================================================
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadCategoryTab, setLeadCategoryTab] = useState('All');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [leadSortOrder, setLeadSortOrder] = useState('newest'); // 'newest' | 'oldest'
  const [updatingLeadId, setUpdatingLeadId] = useState(null);

  // =========================================================
  // 2. PORTFOLIO PROJECTS STATE
  // =========================================================
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectServiceFilter, setProjectServiceFilter] = useState('All');
  const [projectSubcategoryFilter, setProjectSubcategoryFilter] = useState('All');
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectSortOrder, setProjectSortOrder] = useState('newest');

  // Project Modal & Upload Form State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectSaving, setProjectSaving] = useState(false);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [projectMsg, setProjectMsg] = useState({ type: '', text: '' });

  // Password Change Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passLoading, setPassLoading] = useState(false);
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });

  const initialProjectForm = {
    title: '',
    description: '',
    service: 'Graphic Design',
    subCategory: 'logo-branding',
    client: '',
    projectUrl: '',
    featured: false,
    published: true,
    displayOrder: 0,
    mediaItems: [], // Array of { id, url, mediaType, isCover, displayOrder }
    aspectRatio: '16:9',

    // Service-specific & Portfolio Card Highlights
    tag: '',
    metricValue: '',
    metricSub: '',
    problem: '',
    solution: '',
    beforeImage: '',

    techStack: 'Next.js, React, TailwindCSS',
    industry: 'SaaS / E-commerce',
    websiteUrl: '',
    keywordsImproved: '+45 Keywords Top #3',
    trafficGrowth: '+350% Organic Growth',
    caseStudyData: '',
    campaignName: '',
    platform: 'Facebook Ads',
    results: '',
    brandName: '',
    category: '',
    revenueGrowth: '+280% MoM Revenue',
    acosImprovement: 'ACOS reduced 42% -> 14%',
    campaignResults: '',
    videoType: 'Reel',
    videoUrl: '',
    videoFile: ''
  };
  const [projectForm, setProjectForm] = useState(initialProjectForm);

  const multiFileInputRef = useRef(null);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('derixio_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeSection === 'client-requests') {
        fetchLeads();
      } else if (activeSection === 'portfolio-projects') {
        fetchProjects();
      }
    }
  }, [isAuthenticated, activeSection]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPinError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pinInput, pin: pinInput })
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('derixio_admin_auth', 'true');
        sessionStorage.setItem('derixio_admin_pin', pinInput);
      } else {
        setPinError(data.error || 'Invalid Admin Access PIN.');
      }
    } catch (err) {
      setPinError('Connection error. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const getAdminPin = () => {
    return sessionStorage.getItem('derixio_admin_pin') || pinInput;
  };

  // Fetch Client Requests from API / Supabase
  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Error fetching client requests:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  // Fetch Portfolio Projects from API / Supabase
  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch('/api/portfolio/projects');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error('Error fetching portfolio projects:', err);
    } finally {
      setProjectsLoading(false);
    }
  };

  // Client Request Status Update
  const handleLeadStatusChange = async (id, newStatus) => {
    setUpdatingLeadId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  // Delete Lead
  const handleLeadDelete = async (id) => {
    if (!window.confirm('Delete this client request record?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.filter(l => l.id !== id));
        if (selectedLead && selectedLead.id === id) setSelectedLead(null);
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  // Handle Admin Password Update
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMsg({ type: '', text: '' });

    if (!passForm.currentPassword || !passForm.newPassword) {
      setPassMsg({ type: 'error', text: 'Please fill in current and new password.' });
      return;
    }

    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassMsg({ type: 'error', text: 'New password and confirm password do not match.' });
      return;
    }

    if (passForm.newPassword.length < 4) {
      setPassMsg({ type: 'error', text: 'New password must be at least 4 characters long.' });
      return;
    }

    setPassLoading(true);
    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passForm.currentPassword,
          newPassword: passForm.newPassword
        })
      });
      const data = await res.json();

      if (data.success) {
        setPassMsg({ type: 'success', text: data.message || 'Password updated successfully!' });
        sessionStorage.setItem('derixio_admin_pin', passForm.newPassword);
        setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPassMsg({ type: '', text: '' });
        }, 1800);
      } else {
        setPassMsg({ type: 'error', text: data.error || 'Failed to update password.' });
      }
    } catch (err) {
      setPassMsg({ type: 'error', text: 'Network connection error. Please try again.' });
    } finally {
      setPassLoading(false);
    }
  };

  // Multi-File Upload Handler to Supabase Storage Bucket 'portfolio'
  const handleMultiFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setMediaUploading(true);
    setProjectMsg({ type: '', text: '' });

    const newMediaItems = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('authPin', getAdminPin());

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();

        if (data.success && data.url) {
          newMediaItems.push({
            id: `media_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 6)}`,
            url: data.url,
            mediaType: data.mediaType || (file.type.startsWith('video/') ? 'video' : 'image'),
            fileSize: data.fileSize || file.size,
            isCover: projectForm.mediaItems.length === 0 && i === 0,
            displayOrder: projectForm.mediaItems.length + i
          });
        } else {
          setProjectMsg({ type: 'error', text: data.error || `Upload failed for ${file.name}` });
        }
      } catch (err) {
        console.error('File upload error:', err);
      }
    }

    setProjectForm(prev => {
      const updatedMedia = [...prev.mediaItems, ...newMediaItems];
      const hasCover = updatedMedia.some(m => m.isCover);
      if (!hasCover && updatedMedia.length > 0) {
        updatedMedia[0].isCover = true;
      }
      return { ...prev, mediaItems: updatedMedia };
    });

    setMediaUploading(false);
    setProjectMsg({ type: 'success', text: `Successfully uploaded ${newMediaItems.length} media file(s) to Supabase Storage!` });
  };

  // Media Management Helpers
  const handleSetCoverMedia = (mediaId) => {
    setProjectForm(prev => ({
      ...prev,
      mediaItems: prev.mediaItems.map(m => ({
        ...m,
        isCover: m.id === mediaId
      }))
    }));
  };

  const handleRemoveMedia = (mediaId) => {
    setProjectForm(prev => {
      const filtered = prev.mediaItems.filter(m => m.id !== mediaId);
      if (filtered.length > 0 && !filtered.some(m => m.isCover)) {
        filtered[0].isCover = true;
      }
      return { ...prev, mediaItems: filtered };
    });
  };

  const handleMoveMedia = (index, direction) => {
    setProjectForm(prev => {
      const items = [...prev.mediaItems];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;

      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;

      return {
        ...prev,
        mediaItems: items.map((item, idx) => ({ ...item, displayOrder: idx }))
      };
    });
  };

  // Project Modal Form Handlers
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm(initialProjectForm);
    setProjectMsg({ type: '', text: '' });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    let items = Array.isArray(proj.mediaItems) ? proj.mediaItems : [];
    if (items.length === 0 && proj.image) {
      items = [{
        id: `media_0`,
        url: proj.image,
        mediaType: proj.mediaType || 'image',
        isCover: true,
        displayOrder: 0
      }];
    }

    setProjectForm({
      title: proj.title || '',
      description: proj.description || '',
      service: proj.service || 'Graphic Design',
      subCategory: proj.categorySlug || proj.subCategory || 'ui-ux-design',
      client: proj.client || '',
      projectUrl: proj.projectUrl || '',
      featured: Boolean(proj.featured),
      published: proj.published !== false && proj.status !== 'Hidden',
      displayOrder: proj.displayOrder || 0,
      mediaItems: items,

      tag: proj.tag || '',
      metricValue: proj.metricValue || '',
      metricSub: proj.metricSub || '',
      problem: proj.problem || proj.caseStudyData || '',
      solution: proj.solution || '',
      beforeImage: proj.beforeImage || '',

      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack || '',
      industry: proj.industry || '',
      websiteUrl: proj.websiteUrl || proj.projectUrl || '',
      keywordsImproved: proj.keywordsImproved || '',
      trafficGrowth: proj.trafficGrowth || '',
      caseStudyData: proj.caseStudyData || '',
      campaignName: proj.campaignName || proj.title || '',
      platform: proj.platform || '',
      results: proj.results || '',
      brandName: proj.brandName || proj.client || '',
      category: proj.category || '',
      revenueGrowth: proj.revenueGrowth || '',
      acosImprovement: proj.acosImprovement || '',
      campaignResults: proj.campaignResults || '',
      videoType: proj.videoType || 'Reel',
      aspectRatio: proj.aspectRatio || (proj.videoType === 'Reel' || proj.videoType === 'Shorts' || proj.videoType === 'TikTok' ? '9:16' : '16:9'),
      videoUrl: proj.videoUrl || '',
      videoFile: proj.videoFile || ''
    });
    setProjectMsg({ type: '', text: '' });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title) {
      setProjectMsg({ type: 'error', text: 'Project Title is required.' });
      return;
    }

    if (projectForm.mediaItems.length === 0 && !projectForm.videoUrl) {
      setProjectMsg({ type: 'error', text: 'Please upload at least one image or video file.' });
      return;
    }

    setProjectSaving(true);
    setProjectMsg({ type: '', text: '' });

    const targetCategoryObj =
      projectForm.service === 'Amazon Growth'
        ? AMAZON_GROWTH_CATEGORIES.find(c => c.slug === projectForm.subCategory)
        : graphicDesignCategories.find(c => c.slug === projectForm.subCategory);

    let categoryName = targetCategoryObj ? targetCategoryObj.name : projectForm.service;
    if (projectForm.service === 'Amazon Growth') {
      if (projectForm.subCategory === 'amazon-listing-images') categoryName = 'Amazon Listing Images';
      else if (projectForm.subCategory === 'a-plus-content') categoryName = 'Amazon A+ Content';
      else if (projectForm.subCategory === 'amazon-brand-store') categoryName = 'Amazon Storefront Design';
      else if (projectForm.subCategory === 'amazon-campaigns') categoryName = 'Amazon PPC / Growth';
    }

    const coverMedia = projectForm.mediaItems.find(m => m.isCover) || projectForm.mediaItems[0] || {};
    const coverUrl = coverMedia.url || '/assets/portfolio-web-v4.jpg';

    let categorySlug = projectForm.subCategory;
    if (projectForm.service === 'Amazon Growth') {
      categorySlug = projectForm.subCategory || 'amazon-listing-images';
    } else if (projectForm.service === 'Graphic Design') {
      categorySlug = projectForm.subCategory || 'logo-brand-identity';
    } else if (projectForm.service === 'Web Development') {
      categorySlug = 'web-development';
    } else if (projectForm.service === 'SEO') {
      categorySlug = 'seo';
    } else if (projectForm.service === 'Digital Marketing') {
      categorySlug = 'digital-marketing';
    } else if (projectForm.service === 'Video & Motion Design') {
      categorySlug = 'video-motion-design';
    }

    const payload = {
      authPin: getAdminPin(),
      project: {
        ...(editingProject?.id ? { id: editingProject.id } : {}),
        title: projectForm.title.trim(),
        service: projectForm.service,
        categorySlug: categorySlug,
        categoryName: categoryName,
        subCategory: projectForm.subCategory || categorySlug,
        description: projectForm.description.trim(),
        client: projectForm.client.trim(),
        projectUrl: projectForm.projectUrl.trim() || projectForm.websiteUrl.trim(),
        image: coverUrl,
        coverImage: coverUrl,
        mediaItems: projectForm.mediaItems,
        mediaCount: projectForm.mediaItems.length || 1,
        gallery: projectForm.mediaItems.map(m => m.url),
        featured: projectForm.featured,
        published: projectForm.published,
        status: projectForm.published ? 'Published' : 'Hidden',
        displayOrder: Number(projectForm.displayOrder) || 0,
        mediaType: projectForm.service === 'Video & Motion Design' ? 'video' : (coverMedia.mediaType || 'image'),

        // Card Highlights & Metric Badges
        tag: projectForm.tag.trim(),
        metricValue: projectForm.metricValue.trim(),
        metricSub: projectForm.metricSub.trim(),
        problem: projectForm.problem.trim(),
        solution: projectForm.solution.trim(),
        beforeImage: projectForm.beforeImage.trim(),

        // Service-Specific Metadata
        techStack: projectForm.techStack ? projectForm.techStack.split(',').map(s => s.trim()) : [],
        industry: projectForm.industry.trim(),
        websiteUrl: projectForm.websiteUrl.trim(),
        keywordsImproved: projectForm.keywordsImproved.trim(),
        trafficGrowth: projectForm.trafficGrowth.trim(),
        caseStudyData: projectForm.caseStudyData.trim(),
        campaignName: projectForm.campaignName.trim(),
        platform: projectForm.platform.trim(),
        results: projectForm.results.trim(),
        brandName: projectForm.brandName.trim(),
        category: projectForm.category.trim(),
        revenueGrowth: projectForm.revenueGrowth.trim(),
        acosImprovement: projectForm.acosImprovement.trim(),
        campaignResults: projectForm.campaignResults.trim(),
        videoType: projectForm.videoType,
        aspectRatio: projectForm.aspectRatio || '16:9',
        videoUrl: projectForm.videoUrl.trim(),
        videoFile: projectForm.videoFile.trim()
      }
    };

    try {
      const res = await fetch('/api/portfolio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setProjectMsg({ type: 'success', text: 'Project saved permanently to Supabase database!' });
        fetchProjects();
        setTimeout(() => {
          setIsProjectModalOpen(false);
        }, 1000);
      } else {
        setProjectMsg({ type: 'error', text: data.error || 'Failed to save project.' });
      }
    } catch (err) {
      setProjectMsg({ type: 'error', text: 'Error connecting to server.' });
    } finally {
      setProjectSaving(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project permanently from Supabase database and storage?')) return;
    try {
      const res = await fetch(`/api/portfolio/projects/${id}?pin=${getAdminPin()}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        alert(data.error || 'Failed to delete project.');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleTogglePublish = async (proj) => {
    const isCurrentlyPublished = proj.published !== false && (proj.status || '').toUpperCase() !== 'HIDDEN';
    const newPublished = !isCurrentlyPublished;
    const newStatus = newPublished ? 'Published' : 'Hidden';
    try {
      const res = await fetch(`/api/portfolio/projects/${proj.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authPin: getAdminPin(),
          updates: {
            published: newPublished,
            status: newStatus
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setProjects(prev => prev.map(p => p.id === proj.id ? { ...p, published: newPublished, status: newStatus } : p));
      }
    } catch (err) {
      console.error('Error toggling publish state:', err);
    }
  };

  const handleToggleFeatured = async (proj) => {
    const newFeatured = !proj.featured;
    try {
      const res = await fetch(`/api/portfolio/projects/${proj.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authPin: getAdminPin(),
          updates: { featured: newFeatured }
        })
      });
      const data = await res.json();
      if (data.success) {
        setProjects(prev => prev.map(p => p.id === proj.id ? { ...p, featured: newFeatured } : p));
      }
    } catch (err) {
      console.error('Error toggling featured state:', err);
    }
  };

  // Filtered & Sorted Client Requests
  const filteredLeads = useMemo(() => {
    let result = leads.filter(lead => {
      const matchesCategory =
        leadCategoryTab === 'All' ||
        lead.category === leadCategoryTab ||
        (leadCategoryTab === 'Consultation Requests' && lead.category === 'Consultation Request') ||
        (leadCategoryTab === 'Package Requests' && lead.category === 'Package Request') ||
        (leadCategoryTab === 'Contact Requests' && lead.category === 'Contact Request');

      const matchesStatus = leadStatusFilter === 'All' || lead.status === leadStatusFilter;

      const matchesSearch =
        leadSearchQuery === '' ||
        lead.name?.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.whatsapp?.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.company?.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.service?.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.package?.toLowerCase().includes(leadSearchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return leadSortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [leads, leadCategoryTab, leadStatusFilter, leadSearchQuery, leadSortOrder]);

  // Filtered & Sorted Portfolio Projects
  const filteredProjects = useMemo(() => {
    let result = projects.filter(p => {
      const matchesService = projectServiceFilter === 'All' || p.service === projectServiceFilter;
      const matchesSub = projectSubcategoryFilter === 'All' || p.categorySlug === projectSubcategoryFilter || p.subCategory === projectSubcategoryFilter;
      const matchesSearch =
        projectSearchQuery === '' ||
        p.title?.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
        p.client?.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
        p.brandName?.toLowerCase().includes(projectSearchQuery.toLowerCase());

      return matchesService && matchesSub && matchesSearch;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return projectSortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [projects, projectServiceFilter, projectSubcategoryFilter, projectSearchQuery, projectSortOrder]);

  const leadStats = useMemo(() => {
    return {
      total: leads.length,
      consultations: leads.filter(l => l.category === 'Consultation Request').length,
      packages: leads.filter(l => l.category === 'Package Request').length,
      contacts: leads.filter(l => l.category === 'Contact Request').length,
    };
  }, [leads]);

  // Export CSV
  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Category', 'Status', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Package', 'Details'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleString(),
      l.category,
      l.status,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.whatsapp}"`,
      `"${l.company}"`,
      `"${l.service}"`,
      `"${l.package}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Derixio_Client_Requests_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-4 bg-agenko-grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--background-alt)] border border-[var(--border)] flex items-center justify-center text-[#9D26FF] mx-auto mb-4 shadow-lg">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground-heading)] mb-2">
              Derixio Admin Portal
            </h1>
            <p className="text-xs text-[var(--foreground-muted)]">
              Enter master access PIN to manage Client Requests & Portfolio Projects
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground-heading)] uppercase tracking-wider mb-2">
                Access PIN / Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin PIN..."
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] focus:outline-none focus:border-[#9D26FF] transition-colors text-sm"
                required
              />
              {pinError && (
                <p className="text-red-500 text-xs mt-2 font-medium flex items-center justify-center">
                  <AlertCircle size={13} className="mr-1" /> {pinError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              {authLoading ? <span>Authenticating...</span> : (
                <>
                  <Shield size={18} />
                  <span>Access Admin Control</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 pb-20 bg-agenko-grid">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Top Control Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-2">
              <Shield size={13} />
              <span>Derixio Master Control Panel</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground-heading)]">
              {activeSection === 'client-requests'
                ? 'Client Requests Management'
                : activeSection === 'amazon-ppc-case-studies'
                ? 'Amazon PPC Case Studies'
                : 'Portfolio Project Management'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Section Switcher Tabs */}
            <button
              onClick={() => setActiveSection('client-requests')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeSection === 'client-requests'
                  ? 'bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white shadow-md'
                  : 'bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[#9D26FF]'
              }`}
            >
              <Mail size={15} />
              <span>Client Requests ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('portfolio-projects')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeSection === 'portfolio-projects'
                  ? 'bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white shadow-md'
                  : 'bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[#9D26FF]'
              }`}
            >
              <FolderOpen size={15} />
              <span>Standard Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('amazon-ppc-case-studies')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeSection === 'amazon-ppc-case-studies'
                  ? 'bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white font-extrabold shadow-md'
                  : 'bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[#9D26FF]'
              }`}
            >
              <Sparkles size={15} />
              <span>Amazon PPC Case Studies</span>
            </button>

            {activeSection === 'portfolio-projects' && (
              <button
                onClick={openNewProjectModal}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-transform hover:scale-105 inline-flex items-center space-x-1.5"
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            )}

            {activeSection === 'client-requests' && (
              <button
                onClick={exportCSV}
                className="px-3.5 py-2.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs font-bold hover:text-[#9D26FF] hover:border-[#9D26FF] transition-colors inline-flex items-center"
              >
                <Download size={14} className="mr-1.5 text-[#9D26FF]" />
                <span>Export CSV</span>
              </button>
            )}

            <button
              onClick={() => {
                setPassMsg({ type: '', text: '' });
                setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setIsPasswordModalOpen(true);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs font-bold hover:text-[#9D26FF] hover:border-[#9D26FF] transition-colors inline-flex items-center space-x-1.5"
            >
              <KeyRound size={14} className="text-[#9D26FF]" />
              <span>Change Password</span>
            </button>

            <button
              onClick={() => {
                sessionStorage.removeItem('derixio_admin_auth');
                setIsAuthenticated(false);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-colors"
            >
              Lock Panel
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: CLIENT REQUESTS */}
        {/* ========================================================= */}
        {activeSection === 'client-requests' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[var(--card)] backdrop-blur-md border border-[var(--border)] rounded-2xl p-4 text-center shadow-md">
                <p className="text-2xl sm:text-3xl font-black text-[var(--foreground-heading)] mb-1">{leadStats.total}</p>
                <p className="text-[11px] text-[var(--foreground-muted)] uppercase tracking-wider font-semibold">Total Client Submissions</p>
              </div>
              <div className="bg-[var(--card)] backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 text-center shadow-md">
                <p className="text-2xl sm:text-3xl font-black text-[#9D26FF] mb-1">{leadStats.consultations}</p>
                <p className="text-[11px] text-purple-700 dark:text-purple-300 uppercase tracking-wider font-semibold">Consultations</p>
              </div>
              <div className="bg-[var(--card)] backdrop-blur-md border border-blue-500/30 rounded-2xl p-4 text-center shadow-md">
                <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">{leadStats.packages}</p>
                <p className="text-[11px] text-blue-700 dark:text-blue-300 uppercase tracking-wider font-semibold">Package Orders</p>
              </div>
              <div className="bg-[var(--card)] backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 text-center shadow-md">
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{leadStats.contacts}</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300 uppercase tracking-wider font-semibold">Contact Requests</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] p-4 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {['All', 'Consultation Requests', 'Package Requests', 'Contact Requests'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setLeadCategoryTab(tab)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      leadCategoryTab === tab
                        ? 'bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white shadow-md'
                        : 'text-[var(--foreground-muted)] hover:text-[#9D26FF] hover:bg-[var(--background-alt)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
                  <input
                    type="text"
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    placeholder="Search name, email, details..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs focus:outline-none focus:border-[#9D26FF]"
                  />
                </div>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs font-semibold focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  onClick={() => setLeadSortOrder(leadSortOrder === 'newest' ? 'oldest' : 'newest')}
                  className="px-3 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] hover:text-[#9D26FF] hover:border-[#9D26FF] text-xs font-semibold flex items-center space-x-1 transition-colors"
                  title="Toggle Sort Order"
                >
                  <ArrowUpDown size={13} className="text-[#9D26FF]" />
                  <span className="capitalize">{leadSortOrder}</span>
                </button>
              </div>
            </div>

            {/* Client Requests Table */}
            <div className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider bg-[var(--background-alt)]">
                      <th className="py-4 px-4">Client Name</th>
                      <th className="py-4 px-4">Contact Info</th>
                      <th className="py-4 px-4">Service & Package</th>
                      <th className="py-4 px-4">Request Type</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4">Submitted Date</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] text-xs sm:text-sm">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[var(--background-alt)]/60 transition-colors">
                        <td className="py-4 px-4 font-bold text-[var(--foreground-heading)]">
                          <div>{lead.name}</div>
                          {lead.company && lead.company !== 'N/A' && (
                            <span className="text-[11px] text-[var(--foreground-muted)] font-normal">{lead.company}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-[var(--foreground-muted)]">
                          <div className="text-xs text-[var(--foreground-heading)]">{lead.email}</div>
                          {lead.whatsapp && (
                            <div className="text-[11px] text-[var(--foreground-muted)]">{lead.whatsapp}</div>
                          )}
                        </td>
                        <td className="py-4 px-4 text-[var(--foreground-muted)]">
                          <span className="font-semibold text-[var(--foreground-heading)]">{lead.service}</span>
                          {lead.package && <span className="block text-[11px] text-[#9D26FF]">{lead.package}</span>}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF]">
                            {lead.category || 'Client Request'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={lead.status || 'New'}
                            onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                            disabled={updatingLeadId === lead.id}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold focus:outline-none border shadow-sm ${
                              lead.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400' :
                              lead.status === 'In Progress' ? 'bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-400' :
                              lead.status === 'Contacted' ? 'bg-purple-500/10 border-purple-500/40 text-[#9D26FF]' :
                              lead.status === 'Rejected' ? 'bg-red-500/10 border-red-500/40 text-red-600 dark:text-red-400' :
                              'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-[var(--foreground-muted)] text-xs">
                          {new Date(lead.createdAt).toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-3 py-1.5 bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] rounded-lg text-xs font-bold hover:text-[#9D26FF] hover:border-[#9D26FF] transition-colors"
                          >
                            Open Details
                          </button>
                          <button
                            onClick={() => handleLeadDelete(lead.id)}
                            className="p-1.5 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-500/10 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: PORTFOLIO PROJECTS MANAGEMENT */}
        {/* ========================================================= */}
        {activeSection === 'portfolio-projects' && (
          <div className="space-y-6">
            {/* Filter Control Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] p-5 rounded-2xl shadow-sm">
              <div>
                <h2 className="text-xl font-extrabold text-[var(--foreground-heading)] flex items-center">
                  <FolderOpen size={20} className="mr-2 text-[#9D26FF]" />
                  Portfolio Showcase Projects ({filteredProjects.length})
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  Upload & manage multi-media projects. All files persist in Supabase Cloud Storage.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative sm:w-48">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
                  <input
                    type="text"
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs focus:outline-none focus:border-[#9D26FF]"
                  />
                </div>

                <select
                  value={projectServiceFilter}
                  onChange={(e) => setProjectServiceFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs font-semibold focus:outline-none"
                >
                  <option value="All">All Services</option>
                  {PORTFOLIO_SERVICES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={projectSubcategoryFilter}
                  onChange={(e) => setProjectSubcategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs font-semibold focus:outline-none"
                >
                  <option value="All">All Subcategories</option>
                  {graphicDesignCategories.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>

                <button
                  onClick={() => setProjectSortOrder(projectSortOrder === 'newest' ? 'oldest' : 'newest')}
                  className="px-3 py-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] hover:text-[#9D26FF] hover:border-[#9D26FF] text-xs font-semibold flex items-center space-x-1 transition-colors"
                  title="Toggle Sort Order"
                >
                  <ArrowUpDown size={13} className="text-[#9D26FF]" />
                  <span className="capitalize">{projectSortOrder}</span>
                </button>
              </div>
            </div>

            {/* Admin Projects Table / Grid View */}
            {projectsLoading ? (
              <div className="text-center py-20">
                <RefreshCw size={28} className="animate-spin text-[#9D26FF] mx-auto mb-2" />
                <p className="text-sm text-[var(--foreground-muted)]">Loading Supabase Portfolio Projects...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
                <FolderOpen size={40} className="text-[#9D26FF] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[var(--foreground-heading)] mb-2">No Projects Uploaded Yet</h3>
                <p className="text-xs text-[var(--foreground-muted)] max-w-md mx-auto mb-6">
                  Click "Add New Project" above to upload multi-media projects to Supabase Storage.
                </p>
                <button
                  onClick={openNewProjectModal}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white text-xs font-bold shadow-lg"
                >
                  + Add New Project
                </button>
              </div>
            ) : (
              <div className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider bg-[var(--background-alt)]">
                        <th className="py-4 px-4">Cover Media</th>
                        <th className="py-4 px-4">Project Title</th>
                        <th className="py-4 px-4">Service Category</th>
                        <th className="py-4 px-4">Subcategory</th>
                        <th className="py-4 px-4">Media Items</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4">Featured</th>
                        <th className="py-4 px-4">Date</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)] text-xs sm:text-sm">
                      {filteredProjects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-[var(--background-alt)]/60 transition-colors">
                          <td className="py-3 px-4">
                            <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background-alt)]">
                              <Image
                                src={proj.coverImage || proj.image || '/assets/portfolio-web-v4.jpg'}
                                alt={proj.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 font-bold text-[var(--foreground-heading)]">
                            <div>{proj.title}</div>
                            {proj.client && <span className="text-[11px] text-[var(--foreground-muted)] font-normal">{proj.client}</span>}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF]">
                              {proj.service}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[var(--foreground-muted)] text-xs">
                            {proj.categoryName || proj.subCategory || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-[var(--foreground-muted)]">
                            <span className="px-2.5 py-1 rounded-lg bg-[var(--background-alt)] border border-[var(--border)] text-xs font-mono">
                              {(proj.mediaItems?.length || proj.gallery?.length || 1)} Files
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleTogglePublish(proj)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm transition-all cursor-pointer ${
                                proj.published !== false && (proj.status || '').toUpperCase() !== 'HIDDEN'
                                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                                  : 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                              }`}
                              title="Click to toggle visibility (Published/Visible vs Hidden)"
                            >
                              {proj.published !== false && (proj.status || '').toUpperCase() !== 'HIDDEN' ? 'Visible / Published' : 'Hidden'}
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleFeatured(proj)}
                              className={`p-1.5 rounded-full border shadow-sm transition-colors ${
                                proj.featured ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-[var(--background-alt)] text-[var(--foreground-muted)] border-[var(--border)] hover:border-[#9D26FF]'
                              }`}
                              title="Toggle Featured"
                            >
                              <Star size={13} fill={proj.featured ? 'currentColor' : 'none'} />
                            </button>
                          </td>
                          <td className="py-3 px-4 text-[var(--foreground-muted)] text-xs font-mono">
                            {proj.createdAt ? new Date(proj.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => openEditProjectModal(proj)}
                              className="p-1.5 rounded-lg bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] hover:text-[#9D26FF] hover:border-[#9D26FF] transition-colors"
                              title="Edit Project"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 3: AMAZON PPC CASE STUDIES MANAGEMENT */}
        {/* ========================================================= */}
        {activeSection === 'amazon-ppc-case-studies' && (
          <AmazonPpcAdminSection getAdminPin={getAdminPin} />
        )}

      </div>

      {/* ========================================================= */}
      {/* MULTI-MEDIA ADD / EDIT PROJECT MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto text-[var(--foreground)]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] flex items-center justify-center text-[#9D26FF]">
                    <FolderOpen size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[var(--foreground-heading)]">
                      {editingProject ? `Edit ${projectForm.service} Project` : `Add New ${projectForm.service} Project`}
                    </h3>
                    <p className="text-xs text-[var(--foreground-muted)]">Stores multiple images & videos in Supabase Storage</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 text-[var(--foreground-muted)] hover:text-[#9D26FF] rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {projectMsg.text && (
                <div className={`p-3 rounded-xl mb-6 text-xs font-semibold ${
                  projectMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300' : 'bg-red-500/10 border border-red-500/40 text-red-500'
                }`}>
                  {projectMsg.text}
                </div>
              )}

              <form onSubmit={handleSaveProject} className="space-y-5">
                {/* Project Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                    Project / Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Amazon Listing & A+ content Design / SaaS UI Design"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-sm focus:outline-none focus:border-[#9D26FF]"
                  />
                </div>

                {/* Service Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                      Main Service *
                    </label>
                    <select
                      value={projectForm.service}
                      onChange={(e) => {
                        const newService = e.target.value;
                        let defaultSub = 'amazon-listing-images';
                        if (newService === 'Graphic Design') defaultSub = 'logo-branding';
                        else if (newService === 'Web Development') defaultSub = 'web-development';
                        else if (newService === 'SEO') defaultSub = 'seo';
                        else if (newService === 'Digital Marketing') defaultSub = 'digital-marketing';
                        else if (newService === 'Video & Motion Design') defaultSub = 'video-motion-design';

                        setProjectForm(prev => ({
                          ...prev,
                          service: newService,
                          subCategory: defaultSub
                        }));
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs focus:outline-none focus:border-[#9D26FF]"
                    >
                      {PORTFOLIO_SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Amazon Growth Subcategories */}
                  {projectForm.service === 'Amazon Growth' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                        Amazon Growth Subcategory *
                      </label>
                      <select
                        value={projectForm.subCategory || 'amazon-listing-images'}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, subCategory: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs focus:outline-none focus:border-[#9D26FF]"
                      >
                        {AMAZON_GROWTH_CATEGORIES.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Graphic Design Subcategories */}
                  {projectForm.service === 'Graphic Design' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                        Graphic Design Subcategory *
                      </label>
                      <select
                        value={projectForm.subCategory}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, subCategory: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs focus:outline-none focus:border-[#9D26FF]"
                      >
                        {graphicDesignCategories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Video & Motion Design Formats & Flexible Aspect Ratio */}
                  {projectForm.service === 'Video & Motion Design' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                          Video Type *
                        </label>
                        <select
                          value={projectForm.videoType}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, videoType: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs focus:outline-none focus:border-[#9D26FF]"
                        >
                          {VIDEO_TYPES.map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                          Video Aspect Ratio / Format *
                        </label>
                        <select
                          value={projectForm.aspectRatio || '16:9'}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, aspectRatio: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs focus:outline-none focus:border-[#9D26FF]"
                        >
                          <option value="16:9">Landscape (16:9) — YouTube / Commercial</option>
                          <option value="9:16">Vertical (9:16) — Shorts / Reels / TikTok</option>
                          <option value="1:1">Square (1:1) — Social Feed Video</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                {/* MULTI-MEDIA FILE UPLOADER */}
                <div className="bg-[var(--background-alt)] p-5 rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)]">
                      Project Media Gallery ({projectForm.mediaItems.length} Files Uploaded) *
                    </label>

                    <input
                      type="file"
                      ref={multiFileInputRef}
                      multiple
                      accept="image/*,video/*"
                      onChange={handleMultiFileUpload}
                      className="hidden"
                    />

                    <button
                      type="button"
                      disabled={mediaUploading}
                      onClick={() => multiFileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white text-xs font-bold shadow-md hover:from-[#8B5CF6] transition-all flex items-center space-x-2"
                    >
                      <Upload size={14} />
                      <span>{mediaUploading ? 'Uploading to Supabase...' : '+ Add Multiple Images / Videos'}</span>
                    </button>
                  </div>

                  {/* Target Crop Indicator & Dynamic Helper Text */}
                  <div className="flex items-center space-x-2 mb-3 px-3 py-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground-heading)]">
                    <Crop size={14} className="text-[#9D26FF] shrink-0" />
                    <span>Target Cover Crop: <strong className="text-[#9D26FF] font-bold">{getServiceCropDetails(projectForm.service, projectForm.aspectRatio).label}</strong></span>
                  </div>

                  <p className="text-[11px] text-[var(--foreground-muted)] mb-4">
                    {getMediaGalleryHelperText(projectForm.service)}
                    <strong className="text-[#9D26FF] font-semibold">"Set Cover"</strong> to choose the main card thumbnail.
                  </p>

                  {/* Uploaded Media Thumbnails List */}
                  {projectForm.mediaItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-1">
                      {projectForm.mediaItems.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className={`relative group aspect-[4/3] rounded-xl overflow-hidden border bg-[var(--card)] ${
                            item.isCover ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-[var(--border)]'
                          }`}
                        >
                          {item.mediaType === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center bg-[var(--background-alt)] text-[var(--foreground-heading)]">
                              <Video size={20} />
                            </div>
                          ) : (
                            <Image
                              src={item.url}
                              alt="Media item"
                              fill
                              className="object-cover"
                            />
                          )}

                          {/* Cover Badge */}
                          {item.isCover && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-bold z-10">
                              Cover
                            </span>
                          )}

                          {/* Action Overlay */}
                          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 z-20">
                            <div className="flex items-center justify-between">
                              {!item.isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCoverMedia(item.id)}
                                  className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-black hover:bg-amber-400"
                                >
                                  Set Cover
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveMedia(item.id)}
                                className="p-1 text-red-400 hover:text-red-300 ml-auto"
                                title="Remove File"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveMedia(idx, 'up')}
                                className="p-1 text-gray-300 hover:text-white disabled:opacity-30"
                                title="Move Left"
                              >
                                <ArrowUp size={12} />
                              </button>
                              <span className="text-[10px] text-gray-400">#{idx + 1}</span>
                              <button
                                type="button"
                                disabled={idx === projectForm.mediaItems.length - 1}
                                onClick={() => handleMoveMedia(idx, 'down')}
                                className="p-1 text-gray-300 hover:text-white disabled:opacity-30"
                                title="Move Right"
                              >
                                <ArrowDown size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-[var(--border)] rounded-xl">
                      <ImageIcon size={28} className="text-[#9D26FF] mx-auto mb-2 opacity-60" />
                      <p className="text-xs text-[var(--foreground-muted)]">No media files uploaded yet.</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                    Project Description / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter project summary and key deliverables..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs focus:outline-none focus:border-[#9D26FF]"
                  />
                </div>

                {/* Card Tag & Growth Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[var(--background-alt)] p-4 rounded-2xl border border-[var(--border)]">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1">
                      Card Tag (Badge)
                    </label>
                    <input
                      type="text"
                      value={projectForm.tag}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, tag: e.target.value }))}
                      placeholder="e.g. LISTING DESIGN, A+ CONTENT"
                      className="w-full px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1">
                      Metric Highlight (e.g. +340%)
                    </label>
                    <input
                      type="text"
                      value={projectForm.metricValue}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, metricValue: e.target.value }))}
                      placeholder="e.g. +340% or 4.2x ROAS"
                      className="w-full px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1">
                      Metric Subtext (e.g. SALES BOOST)
                    </label>
                    <input
                      type="text"
                      value={projectForm.metricSub}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, metricSub: e.target.value }))}
                      placeholder="e.g. SALES BOOST, ROAS"
                      className="w-full px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs"
                    />
                  </div>
                </div>

                {/* Case Study Modal Details: Problem, Solution & Results */}
                <div className="space-y-4 bg-[var(--background-alt)] p-4 rounded-2xl border border-[var(--border)]">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#9D26FF] flex items-center space-x-1.5">
                    <FileText size={14} />
                    <span>Case Study Modal Details (Problem, Solution, Results)</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-[var(--foreground-heading)] mb-1">
                      Client Problem / Initial Challenge
                    </label>
                    <textarea
                      rows={2}
                      value={projectForm.problem}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, problem: e.target.value }))}
                      placeholder="Describe the problem, low conversion rates, or initial design issues..."
                      className="w-full px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--foreground-heading)] mb-1">
                      Our Executed Strategy & Solution
                    </label>
                    <textarea
                      rows={2}
                      value={projectForm.solution}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, solution: e.target.value }))}
                      placeholder="Describe our strategic workflow, design revamp, target audience messaging..."
                      className="w-full px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--foreground-heading)] mb-1">
                      Measured Growth & Results
                    </label>
                    <textarea
                      rows={2}
                      value={projectForm.results}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, results: e.target.value }))}
                      placeholder="Describe the final results, sales growth, or performance outcome..."
                      className="w-full px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs"
                    />
                  </div>
                </div>

                {/* Client & Live URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                      Client Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={projectForm.client}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, client: e.target.value }))}
                      placeholder="e.g. Chen Enterprises"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                      Project Live URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={projectForm.projectUrl}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, projectUrl: e.target.value }))}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs"
                    />
                  </div>
                </div>

                {/* Status & Featured */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-[var(--foreground-heading)]">
                      <input
                        type="checkbox"
                        checked={projectForm.published}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, published: e.target.checked }))}
                        className="rounded border-[var(--border)] text-[#9D26FF] focus:ring-0"
                      />
                      <span>Publish on Website</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-[var(--foreground-heading)]">
                      <input
                        type="checkbox"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded border-[var(--border)] text-amber-500 focus:ring-0"
                      />
                      <span>Mark Featured</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                      Display Order (Sort Position)
                    </label>
                    <input
                      type="number"
                      value={projectForm.displayOrder}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, displayOrder: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs font-bold hover:text-[#9D26FF] hover:border-[#9D26FF] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={projectSaving || mediaUploading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] text-white text-xs font-bold shadow-md"
                  >
                    {projectSaving ? 'Saving to Supabase...' : 'Save Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CLIENT REQUEST DETAILS MODAL */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 text-[var(--foreground)]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                    {selectedLead.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[var(--foreground-heading)]">{selectedLead.name}</h3>
                </div>
                <button onClick={() => setSelectedLead(null)} className="p-2 text-[var(--foreground-muted)] hover:text-[#9D26FF] rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[var(--foreground-muted)]">
                <div className="grid grid-cols-2 gap-4 bg-[var(--background-alt)] p-4 rounded-xl border border-[var(--border)]">
                  <div>
                    <span className="block text-[var(--foreground-muted)] font-semibold mb-1">Email:</span>
                    <span className="text-[var(--foreground-heading)] font-bold">{selectedLead.email}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--foreground-muted)] font-semibold mb-1">Phone / WhatsApp:</span>
                    <span className="text-[var(--foreground-heading)] font-bold">{selectedLead.whatsapp || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--foreground-muted)] font-semibold mb-1">Company:</span>
                    <span className="text-[var(--foreground-heading)] font-bold">{selectedLead.company || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--foreground-muted)] font-semibold mb-1">Submitted Date:</span>
                    <span className="text-[var(--foreground-heading)] font-bold">{new Date(selectedLead.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-[var(--background-alt)] p-4 rounded-xl border border-[var(--border)]">
                  <span className="block text-[var(--foreground-muted)] font-semibold mb-1">Selected Service & Package:</span>
                  <p className="text-[var(--foreground-heading)] font-bold">{selectedLead.service} — {selectedLead.package}</p>
                </div>

                <div className="bg-[var(--background-alt)] p-4 rounded-xl border border-[var(--border)]">
                  <span className="block text-[var(--foreground-muted)] font-semibold mb-1">Message / Requirements:</span>
                  <p className="text-[var(--foreground-heading)] whitespace-pre-wrap leading-relaxed">{selectedLead.details}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs text-[var(--foreground-muted)]">ID: {selectedLead.id}</span>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL: CHANGE ADMIN PASSWORD */}
        {/* ========================================================= */}
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-[var(--foreground)]"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border)]">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF]">
                    <KeyRound size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--foreground-heading)]">Change Admin Password</h3>
                    <p className="text-xs text-[var(--foreground-muted)]">Update panel PIN / password</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="p-2 rounded-xl text-[var(--foreground-muted)] hover:text-[#9D26FF] hover:bg-[var(--background-alt)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {passMsg.text && (
                <div
                  className={`p-3.5 mb-5 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
                    passMsg.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300'
                      : 'bg-red-500/10 border border-red-500/40 text-red-500'
                  }`}
                >
                  {passMsg.type === 'success' ? (
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                  ) : (
                    <AlertCircle size={16} className="shrink-0 text-red-500" />
                  )}
                  <span>{passMsg.text}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                    Current Password / PIN *
                  </label>
                  <input
                    type="password"
                    required
                    value={passForm.currentPassword}
                    onChange={(e) => setPassForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-sm focus:outline-none focus:border-[#9D26FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                    New Password / PIN *
                  </label>
                  <input
                    type="password"
                    required
                    value={passForm.newPassword}
                    onChange={(e) => setPassForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password (min 4 characters)"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-sm focus:outline-none focus:border-[#9D26FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground-heading)] mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={passForm.confirmPassword}
                    onChange={(e) => setPassForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-sm focus:outline-none focus:border-[#9D26FF]"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] text-xs font-bold hover:text-[#9D26FF] hover:border-[#9D26FF] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={passLoading}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2"
                  >
                    {passLoading ? <span>Updating...</span> : (
                      <>
                        <Shield size={14} />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

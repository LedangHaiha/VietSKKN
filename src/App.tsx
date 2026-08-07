import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Sidebar, ActiveTab } from './components/common/Sidebar';
import { ProgressBar } from './components/common/ProgressBar';
import { DashboardView } from './features/dashboard/DashboardView';
import { ProjectWizard } from './features/project-wizard/ProjectWizard';
import { AgentWorkspaceView } from './features/agent-workspace/AgentWorkspaceView';
import { DocumentEditorView } from './features/editor-preview/DocumentEditorView';
import { EvidenceStudioView } from './features/evidence-studio/EvidenceStudioView';
import { QualityReviewView } from './features/quality-review/QualityReviewView';
import { AIJurySimulatorView } from './features/defense-simulator/AIJurySimulatorView';
import { WordAddinTaskpaneView } from './features/word-addin/WordAddinTaskpaneView';
import { DocumentManagerView } from './features/documents/DocumentManagerView';
import { SettingsView } from './features/settings/SettingsView';
import { VoiceAgentModal } from './features/agent-workspace/VoiceAgentModal';
import { ShareProjectModal } from './components/common/ShareProjectModal';
import { TemplateUploadModal } from './features/project-wizard/TemplateUploadModal';
import { ContentDrivenWizardModal } from './features/project-wizard/ContentDrivenWizardModal';
import { ParsedSKKNTemplate } from './services/templateParserService';
import { SKKNProject, SKKNSection, SKKNSectionCode } from './types/skkn';
import {
  createEmptyProject,
  getStoredProjects,
  saveProjectsToStorage,
  saveActiveProjectId,
  getActiveProjectId,
} from './services/storageService';

import { generateFullSKKNContent } from './services/fullSkknAutoGeneratorService';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<SKKNProject[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [showContentDrivenModal, setShowContentDrivenModal] = useState<boolean>(false);
  const [isAutoGeneratingFull, setIsAutoGeneratingFull] = useState<boolean>(false);

  useEffect(() => {
    const loaded = getStoredProjects();
    if (loaded.length > 0) {
      setProjects(loaded);
      const savedActiveId = getActiveProjectId();
      if (savedActiveId && loaded.some((p) => p.id === savedActiveId)) {
        setActiveProjectId(savedActiveId);
      } else {
        setActiveProjectId(loaded[0].id);
      }
    } else {
      // Create seed project
      const seed = createEmptyProject('Biện pháp nâng cao năng lực tự học cho học sinh môn Ngữ văn GDPT 2018');
      setProjects([seed]);
      setActiveProjectId(seed.id);
      saveProjectsToStorage([seed]);
      saveActiveProjectId(seed.id);
    }
  }, []);

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  const handleUpdateProject = (updated: SKKNProject) => {
    const newProjects = projects.map((p) => (p.id === updated.id ? updated : p));
    setProjects(newProjects);
    saveProjectsToStorage(newProjects);
  };

  const handleAutoGenerateFullSKKN = async () => {
    if (!activeProject) return;
    setIsAutoGeneratingFull(true);
    try {
      const generatedSections = await generateFullSKKNContent(activeProject);
      const updated: SKKNProject = {
        ...activeProject,
        sections: generatedSections,
        updatedAt: new Date().toISOString()
      };
      handleUpdateProject(updated);
      setActiveTab('editor');
    } finally {
      setIsAutoGeneratingFull(false);
    }
  };

  const handleApplyParsedTemplate = (parsed: ParsedSKKNTemplate) => {
    if (!activeProject) return;
    const updated: SKKNProject = {
      ...activeProject,
      schoolUnit: parsed.detectedSchoolUnit,
      sections: parsed.extractedSections,
      updatedAt: new Date().toISOString()
    };
    handleUpdateProject(updated);
  };

  const handleApplyGeneratedContentDrivenSKKN = (title: string, sections: SKKNSection[]) => {
    if (!activeProject) return;
    const updated: SKKNProject = {
      ...activeProject,
      title,
      sections,
      updatedAt: new Date().toISOString()
    };
    handleUpdateProject(updated);
    setActiveTab('editor');
  };

  const handleCreateNewProject = () => {
    const newP = createEmptyProject('Sáng kiến kinh nghiệm mới chưa đặt tên');
    const newProjects = [newP, ...projects];
    setProjects(newProjects);
    setActiveProjectId(newP.id);
    saveProjectsToStorage(newProjects);
    saveActiveProjectId(newP.id);
    setActiveTab('wizard');
  };

  const handleUseTopicTemplate = (topic: string) => {
    const newP = createEmptyProject(topic);
    const newProjects = [newP, ...projects];
    setProjects(newProjects);
    setActiveProjectId(newP.id);
    saveProjectsToStorage(newProjects);
    saveActiveProjectId(newP.id);
    setActiveTab('wizard');
  };

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    saveActiveProjectId(id);
    setActiveTab('editor');
  };

  const handleApplyVoiceText = (sectionCode: SKKNSectionCode, text: string) => {
    if (!activeProject) return;
    const updatedSections = activeProject.sections.map((sec) => {
      if (sec.code === sectionCode) {
        const firstSub = sec.subSections[0];
        return {
          ...sec,
          subSections: sec.subSections.map((sub, idx) =>
            idx === 0 ? { ...sub, content: (sub.content ? sub.content + '\n\n' : '') + text } : sub
          )
        };
      }
      return sec;
    });

    handleUpdateProject({ ...activeProject, sections: updatedSections });
  };

  const handleStepSelect = (step: number) => {
    if (activeProject) {
      handleUpdateProject({ ...activeProject, currentStep: step });
      if (step <= 9) setActiveTab('wizard');
      else if (step === 10) setActiveTab('agents');
      else if (step <= 12) setActiveTab('editor');
      else if (step === 13) setActiveTab('evidence');
      else if (step === 14) setActiveTab('audit');
      else setActiveTab('editor');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        activeProject={activeProject}
        onNewProject={handleCreateNewProject}
        onOpenWorkspace={() => setActiveTab('editor')}
        onOpenVoiceModal={() => setShowVoiceModal(true)}
        onOpenShareModal={() => setShowShareModal(true)}
        onOpenTemplateModal={() => setShowTemplateModal(true)}
        onOpenContentDrivenModal={() => setShowContentDrivenModal(true)}
        onAutoGenerateFullSKKN={handleAutoGenerateFullSKKN}
      />

      {activeProject && (
        <ProgressBar
          currentStep={activeProject.currentStep || 1}
          onSelectStep={handleStepSelect}
        />
      )}

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          hasActiveProject={!!activeProject}
        />

        <main className="flex-1 overflow-y-auto bg-slate-950">
          {activeTab === 'dashboard' && (
            <DashboardView
              projects={projects}
              onSelectProject={handleSelectProject}
              onCreateNew={handleCreateNewProject}
              onUseTopicTemplate={handleUseTopicTemplate}
            />
          )}

          {activeTab === 'wizard' && activeProject && (
            <ProjectWizard
              project={activeProject}
              onUpdateProject={handleUpdateProject}
              onNavigateToTab={(t) => setActiveTab(t)}
            />
          )}

          {activeTab === 'agents' && activeProject && (
            <AgentWorkspaceView
              project={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === 'editor' && activeProject && (
            <DocumentEditorView
              project={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === 'evidence' && activeProject && (
            <EvidenceStudioView
              project={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === 'defense' && activeProject && (
            <AIJurySimulatorView project={activeProject} />
          )}

          {activeTab === 'word_addin' && activeProject && (
            <WordAddinTaskpaneView
              project={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === 'documents' && <DocumentManagerView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {showVoiceModal && activeProject && (
        <VoiceAgentModal
          project={activeProject}
          onClose={() => setShowVoiceModal(false)}
          onApplyTextToSection={handleApplyVoiceText}
        />
      )}

      {showShareModal && activeProject && (
        <ShareProjectModal
          project={activeProject}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showTemplateModal && activeProject && (
        <TemplateUploadModal
          project={activeProject}
          onClose={() => setShowTemplateModal(false)}
          onApplyTemplate={handleApplyParsedTemplate}
        />
      )}

      {showContentDrivenModal && activeProject && (
        <ContentDrivenWizardModal
          project={activeProject}
          onClose={() => setShowContentDrivenModal(false)}
          onApplyGeneratedSections={handleApplyGeneratedContentDrivenSKKN}
        />
      )}
    </div>
  );
};

